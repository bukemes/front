import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { http} from '../utilities/auth';
import ICustomError from '../models/ICustomError';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const useRefresh = () => {
    const [error, setError] = useState<ICustomError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const refresh = async () => {
        const token = Cookies.get('token');

        if(token){
            // attempt to use refresh to update both bookies
            http.get('/refresh')
                .then(() => { // { data }
                    const newToken: string = Cookies.get('token') as string;
                    const { email, role }: any = jwt_decode(newToken);
                    setIsLoading(false);
                    dispatch({ type: 'LOGIN', payload: {email, role} });
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError(err.response.data);
                });
            
        } else {
            Cookies.remove('token');
            setIsLoading(false);
            dispatch({ type: 'LOGOUT' });
        }
    };

    return {refresh, isLoading, error};
    
};