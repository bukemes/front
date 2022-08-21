/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';

export interface IAuthUser {
    isAuthenticated: boolean;
    email?: string;
    role?: string;
}

export interface IAuthContext {
    state: IAuthUser | null;
    setState: any;
}

const authUser: IAuthUser = {
    isAuthenticated: false,
};

const authContext: IAuthContext = {
    state: authUser,
    setState: null
};

export const AuthContext = createContext<IAuthContext>(authContext);


export const AuthContextProvider = ({ children }: any) => {
    const [state, setState] = useState(authUser);

    const x: IAuthContext = {
        state,
        setState
    };

    return (
        <AuthContext.Provider value={x}>
            {children}
        </AuthContext.Provider>        
    );
};