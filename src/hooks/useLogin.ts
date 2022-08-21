import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { ILogin, http, IPKCE } from '../utilities/auth';
import ICustomError from '../models/ICustomError';

export const useLogin = () => {
    const [error, setError] = useState<ICustomError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (input: ILogin, pkce: IPKCE) => {
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
        
        http.post('/login', data, config)
            .then(({ data }) => {
                setIsLoading(false);
                localStorage.setItem('Authorization', `Bearer ${JSON.stringify(data)}`);
                dispatch({ type: 'LOGIN', payload: data });
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.response.data);
            });
    };

    return { login, isLoading, error, setError };
};