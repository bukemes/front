import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9002/api',
    withCredentials: true
});


