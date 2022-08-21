import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuthContext = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context: any = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    
    return context;
};

