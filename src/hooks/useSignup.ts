import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { ISignup, http, IPKCE } from '../utilities/auth';
import ICustomError from '../models/ICustomError';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export const useSignup = () => {
    const [error, setError] = useState<ICustomError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    
    const signup = async (input: ISignup, pkce: IPKCE) => {
        setIsLoading(true);

        const config = { 
            headers:{
                'Content-Type': 'application/json',
            },
        };
    
        const data = {
            input,
            pkce: {
                code_verifier: pkce.code_verifier,
                code_authorization: pkce.code_authorization
            }
        };
        
        http.post('/signup', data, config)
            .then(() => { // { data } 
                const newToken: string = Cookies.get('token') as string;
                const { email, role }: any = jwt_decode(newToken);
                setIsLoading(false);
                dispatch({ type: 'LOGIN', payload: { email, role } });
                navigate('/');
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('useSignup.err', err.response.data);
                setError(err.response.data);
            });
    };

    return { signup, isLoading, error, setError };
};