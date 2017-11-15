import http from './http';
import { setToken } from './token';

const login = (email, password) => 
    http.post("/auth/login", {email:email, password: password})
        .then((res) => {
            setToken(res.data.jwt)
            return res;
        });

export { login }