import React, { useState, useEffect } from 'react';
import { Button, DarkThemeToggle, Label, Spinner, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { ILogin, IPKCE, requestPKCE } from '../utilities/auth';
import { useLogin } from '../hooks/useLogin';
import {processErrorFields} from '../utilities/validation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // hooks
    const { login, isLoading, error, setError} = useLogin();
    
    // effects
    useEffect(() => {
        setError(null);
    } , [email, password]);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function handleSubmit(event: any){
        event.preventDefault(); // prevent page refresh on form submit
        const pkce: IPKCE | string = await requestPKCE(); // generate PKCE and request auth from server
        

        const data: ILogin = {
            email,
            password,
        };

        await login(data, pkce);
    }  
      
    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* error message */}
                <div className='text-red-600 dark:text-red-500"'>
                    {error ? 
                        error?.fields ? '' : error.message
                        : '' }
                </div>
                {/* email */}
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email"
                            value="Your email"
                        />
                    </div>
                    <TextInput
                        onChange={e => setEmail(e.target.value)}
                        id="email"
                        type="email"
                        placeholder="name@tania.tours"
                        required={true}
                        shadow={true}
                        icon={HiMail}
                        color={processErrorFields(error?.fields, 'email') ? 'failure' : 'gray' }
                        helperText={processErrorFields(error?.fields, 'email') ? error?.message : '' }
                    />
                </div>
                {/* password */}
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        onChange={e => setPassword(e.target.value)}
                        id="password"
                        type="password"
                        required={true}
                        shadow={true}
                        icon={HiLockClosed}
                        color={processErrorFields(error?.fields, 'password') ? 'failure' : 'gray' }
                        helperText={processErrorFields(error?.fields, 'password') ? error?.message : '' }
                    />
                </div>
                {/* buttons/links */}
                <div className='flex flex-wrap gap-2'>
                    <Button type="submit"
                        disabled={isLoading} >
                        { isLoading ? (
                            <div>
                                <Spinner
                                    size="sm"
                                    light={true}
                                />
                                <span className='ml-2'>Login</span>
                            </div>
                            
                        ) : 'Login' }
                    </Button>
                    <Link to="/signup" >
                        <Button color="gray">
                        Register
                        </Button>    
                    </Link>
                    <div className='flex flex-grow justify-end'>
                        <DarkThemeToggle  />
                    </div>
                </div>
            </form>
        </>
    );
}