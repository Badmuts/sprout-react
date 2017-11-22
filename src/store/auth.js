import { getToken, removeToken } from './token';

const auth = {
    isAuthenticated: () => (getToken() !== null),
    logout: () => removeToken()
};

export default auth;