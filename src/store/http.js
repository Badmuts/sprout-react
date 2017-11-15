import axios from 'axios';
import { getToken } from './token';

const http = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Authorization': `Bearer ${getToken() || ""}`}
});

export default http;