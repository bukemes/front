import { Button } from 'flowbite-react';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function ReservationsPage() {
    // const authState = useContext(AuthContext);

    // function changeAuthState(){
    //     authState.setState({
    //         isAuthenticated: true,
    //         email: 'andrei@lavrenov.io'
    //     });
    // }

    return (
        <>
            ReservationsPage
            {/* <pre>{JSON.stringify(authState)}</pre>

            <Button onClick={changeAuthState}>
                Change Auth State
            </Button> */}
        </>
    );
}