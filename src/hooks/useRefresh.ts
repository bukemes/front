import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { http} from '../utilities/auth';
import ICustomError from '../models/ICustomError';
import Cookies from 'js-cookie';

export const useRefresh = () => {
    const [error, setError] = useState<ICustomError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const refresh = async () => {
        const token = Cookies.get('token');
        
        const config = { 
            withCredentials: true
        };

        http.get('/refresh', config)
            .then(({ data }) => {
                console.log('useRefresh', data);
                setIsLoading(false);
                dispatch({ type: 'LOGIN', payload: data });
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.response.data);
            });

        if(token){
            // attempt to use refresh to update both bookies
        } else {
            Cookies.remove('token');
            setIsLoading(false);
            dispatch({ type: 'LOGOUT' });
        }
    };

    return {refresh, isLoading, error};
    
};