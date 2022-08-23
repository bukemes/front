import axios from 'axios';

export const api = axios.create({
    // baseURL: 'https://api.tania.tours/',
    baseURL: 'http://localhost:9002/api',
    withCredentials: true
});
