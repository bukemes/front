import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { ILogin, http, IPKCE } from '../utilities/auth';
import ICustomError from '../models/ICustomError';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState<ICustomError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    // ReactRouter.browserHistory;

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
            .then(() => { // { data }
                const newToken: string = Cookies.get('token') as string;
                const { email, role }: any = jwt_decode(newToken);
                setIsLoading(false);
                // if(role !== 'admin'){
                //     const error: ICustomError = {
                //         code: 401,
                //         type: 'UNAUTHORIZED',
                //         message: 'You are not an administrator',
                //     };
                //     setError(error);
                // } else {
                    
                // }
                dispatch({ type: 'LOGIN', payload: { email, role } });
                if(role === 'admin'){
                    navigate('/admin/dashboard');
                } else {
                    navigate(-1);
                }
                
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.response.data);
            });
    };

    return { login, isLoading, error, setError };
};