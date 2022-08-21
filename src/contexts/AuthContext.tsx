/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';

// CONTEXT

const initialState = {
    isAuthenticated: false,
    user: {},
};  

export const AuthContext = createContext(null);

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
    case 'LOGIN':
        return {
            isAuthenticated: true,
            user: action.payload,
        };     
    case 'LOGOUT':
        return {
            isAuthenticated: false,
            user: null
        };        
    default:
        return state;
    }
};

export const AuthContextProvider: any = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // console.log('authContext: ', state);
    
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>        
    );
};