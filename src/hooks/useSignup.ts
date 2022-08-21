import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { ISignup, http, IPKCE } from '../utilities/auth';
import ICustomError from '../models/ICustomError';

export const useSignup = () => {
    const [error, setError] = useState<ICustomError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

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
            .then(({ data }) => {
                setIsLoading(false);
                console.log('useSignup.data', data);
                // localStorage.setItem('Authorization', `Bearer ${JSON.stringify(data)}`);
                dispatch({ type: 'LOGIN', payload: data });
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('useSignup.err', err.response.data);
                setError(err.response.data);
            });
    };

    return { signup, isLoading, error, setError };
};