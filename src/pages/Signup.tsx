import React, { useState, useEffect } from 'react';
import { Button, Checkbox, DarkThemeToggle, Label, Spinner, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiMail, HiLockClosed } from 'react-icons/hi';
// utilities
import { ISignup, requestPKCE } from '../utilities/auth';
import { IPKCE } from '../utilities/auth';
import { useSignup } from '../hooks/useSignup';
import {processErrorFields} from '../utilities/validation';


export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [tos, setTos] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    // hooks
    const { signup, isLoading, error, setError } = useSignup();

    // effects
    useEffect(() => {
        if(password !== passwordConfirm){
            setPasswordConfirmError(true);
        } else {
            setPasswordConfirmError(false);
        }
    } , [password, passwordConfirm]);

    useEffect(() => {
        setError(null);
    } , [email, password, tos]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function handleSubmit(event: any){
        event.preventDefault(); // prevent page refresh on form submit
        const pkce: IPKCE | string = await requestPKCE(); // generate PKCE and request auth from server
        

        const data: ISignup = {
            email,
            password,
            tos,
        };

        await signup(data, pkce);
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
                        helperText={processErrorFields(error?.fields, 'email') ? error?.message : ''}
                    />
                    <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                        We’ll never share your details. Read our{' '}
                        <Link to="/privacy"
                            className="text-blue-600 hover:underline dark:text-blue-500"
                        > Privacy Policy
                        </Link>.
                    </p>
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
                {/* repeat password */}
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="repeat-password"
                            value="Repeat password"
                        />
                    </div>
                    <TextInput
                        onChange={e => setPasswordConfirm(e.target.value)}
                        id="repeat-password"
                        type="password"
                        required={true}
                        shadow={true}
                        color={passwordConfirmError ? 'failure' : 'gray'}
                        icon={HiLockClosed}
                        helperText={passwordConfirmError ? 'Passwords do not match' : ''}
                        
                    />
                </div>
                {/* tos */}
                <div className="flex items-center gap-2">
                    <Checkbox 
                        onChange={e => e.target.checked ? setTos(true) : setTos(false)}
                        id="agree" 
                        required={true}
                        
                    />
                    <div className='flex flex-col'>
                        <Label htmlFor="agree">
                        I agree with the{' '}
                            <Link to="/tos"
                                className="text-blue-600 hover:underline dark:text-blue-500"
                            > Terms & Conditions
                            </Link>
                        </Label> 
                        {
                            processErrorFields(error?.fields, 'tos') ? (
                                <div className="text-red-600 dark:text-red-500">
                                You must agree to the terms and conditions
                                </div>
                            ) : null 
                        }   
                    </div>
                    
                </div>
                {/* buttons/links */}
                <div className='flex flex-wrap gap-2'>
                    <Button type="submit"
                        disabled={isLoading}>
                        { isLoading ? (
                            <div>
                                <Spinner
                                    size="sm"
                                    light={true}
                                />
                                <span className='ml-2'>Register new account</span>
                            </div>
                            
                        ) : 'Register new account' }
                    </Button>
                    <Link to="/login" >
                        <Button color="gray">
                            Login
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