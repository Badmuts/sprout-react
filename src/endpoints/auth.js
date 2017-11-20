import http from '../store/http';
import { setToken } from '../store/token';

export const login = (email, password) => 
    http.post("/auth/login", {email:email, password: password})
        .then((res) => {
            setToken(res.data.jwt)
            return res;
        });

export const register = (email, password) => http.post("/users", {email, password});