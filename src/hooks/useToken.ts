import { useAuthContext } from './useAuthContext';

export const useToken = () => {
    const { dispatch } = useAuthContext();

    const relogin = async () => {
        const data = localStorage.getItem('Authorization');
        if(data) {
            dispatch({ type: 'LOGIN', payload: data });
        }
    };
    
    return { relogin };
};