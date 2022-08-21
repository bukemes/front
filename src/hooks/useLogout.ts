import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    
    const logout = () => {
        // remove local token
        localStorage.removeItem('Authorization');
        // POST /logout to invalidate session
        // TODO

        // dispatch logout action
        dispatch({ type: 'LOGOUT' });
    };

    return { logout };
};