import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { http } from '../utilities/auth';
import ICustomError from '../models/ICustomError';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const [error, setError] = useState<ICustomError | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        setIsLoading(true);

        const config = { 
            withCredentials: true
        };

        http.get('/logout', config)
            .then(() => { // { data } from response
                setIsLoading(false);
                dispatch({ type: 'LOGOUT' });
                navigate('/login');
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('useLogout.err', err.response.data);
                setError(err.response.data);
            });
    };

    return { logout, error, isLoading };
};