import axios from 'axios';
import pkceChallenge from 'pkce-challenge';

export const http = axios.create({
    // baseURL: 'https://auth.tania.tours/',
    baseURL: 'http://localhost:9001/auth',
    withCredentials: true
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Content-Type': 'application/json'
    // }
    //
    //
    // const baseURL = 'http://localhost:9001';
    // const controller = new AbortController();
    // axios.defaults.baseURL = 'http://localhost:9001';
    //
    //
    // headers
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials':true,
    // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
});

export interface IPKCE {
    code_challenge: string;
    code_verifier: string;
    code_authorization: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ISignup {
    email: string;
    password: string;
    tos: boolean;
}

async function requestPKCE(): Promise<IPKCE> {
    const {code_challenge, code_verifier} = pkceChallenge(128);   

    const config = { 
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            response_type: 'code',
            code_challenge: code_challenge,
            code_challenge_method:'S256'
        }
    };
    
    const res = await http.get('/pkce', config);

    const pkce: IPKCE = {
        code_challenge,
        code_verifier,
        code_authorization: res.data.code_authorization
    };

    return pkce;
}

async function signup(input: ISignup, pkce: IPKCE) {
    const config = { 
        headers:{
            'Content-Type': 'application/json',
        },
        // params: {
        //     code_verifier: pkce.code_verifier,
        //     code_authorization: pkce.code_authorization
        // }
    };

    const data = {
        input,
        pkce: {
            code_verifier: pkce.code_verifier,
            code_authorization: pkce.code_authorization
        }
    };

    return await http.post('/signup', data, config);
    // try {
        
    //     // console.log(res);
    // } catch (error) {
    //     console.log(error);
    // }
}

async function login(input: ILogin, pkce: IPKCE) {
    const config = { 
        headers:{
            'Content-Type': 'application/json',
        },
    };

    const data = {
        input,
        pkce: {
            code_verifier: pkce.code_verifier,
            code_authorization: pkce.code_authorization
        }
    };

    // return await fetch('http://localhost:9001/auth/login', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // });
  
    return await http.post('/login', data, config);
}

export { requestPKCE, signup, login };