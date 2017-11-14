import axios from 'axios';

const login = (email, password) => axios.post("http://localhost:3000/auth/login", {email:email, password: password})

export { login }