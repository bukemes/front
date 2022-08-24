import React, { useState, useEffect } from 'react';
import { Button, Checkbox, DarkThemeToggle, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiMail, HiLockClosed } from 'react-icons/hi';
// utilities
import { ISignup, requestPKCE, signup } from '../utilities/auth';
import { IPKCE } from '../utilities/auth';

export default function SignupPage() {
    // pkce
    // const [pkce, setPKCE] = useState({});    
    // input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [tos, setTos] = useState(false);
    // display errors
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [tosError, setTosError] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function handleSubmit(event: any){
        event.preventDefault(); // prevent page refresh on form submit
        const pkce: IPKCE = await requestPKCE(); // generate PKCE and request auth from server
        

        const data: ISignup = {
            email,
            password,
            tos,
        };

        if(data.tos !== true){
            setTosError(true);
        } 

        if( emailError === false &&
            passwordError === false &&
            passwordConfirmError === false &&
            tosError === false ) {

            try {
                const token = await signup(data, pkce);
                console.log(token.data);
            } catch (error) {
                console.log('error: ' + error);
            }
        }
    }
    
    useEffect(() => {
        if(password !== passwordConfirm){
            setPasswordConfirmError(true);
        } else {
            setPasswordConfirmError(false);
        }
    } , [password, passwordConfirm]);

    useEffect(() => {
        if(tosError === true && tos === true){
            setTosError(false);
        }
    } , [tos]);
    

    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                        color={emailError ? 'failure' : 'gray'}
                        helperText={
                            <>
                                We’ll never share your details. Read our{' '}
                                <Link to="/privacy"
                                    className="text-blue-600 hover:underline dark:text-blue-500"
                                > Privacy Policy
                                </Link>.
                            </>
                        }
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
                    />
                    <div className='flex flex-col'>
                        <Label htmlFor="agree">
                        I agree with the{' '}
                            <Link to="/tos"
                                className="text-blue-600 hover:underline dark:text-blue-500"
                            > terms and conditions
                            </Link>
                        </Label>
                        {
                            tosError ? (
                                <div className="text-red-600">
                                You must agree to the terms and conditions
                                </div>
                            ) : null
                        }
                    </div>
                    
                </div>
                {/* buttons/links */}
                <div className='flex flex-wrap gap-2'>
                    <Button type="submit">
                    Register new account
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