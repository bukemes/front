import React from 'react';

// honestly, typescript just gets in the way. fuck typescript.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Section({ children, className, style }: any) {
    

    const classes = `${className} 
    dark:bg-gray-800 bg-white 
    dark:text-white text-gray-900 
    p-3 mb-2
    flex flex-wrap 
    rounded`;

    return (
        <div style={style} className={classes}>
            {children}
        </div>
    );
}