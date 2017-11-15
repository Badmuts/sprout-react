import { getToken } from './token';

const auth = {
    isAuthenticated: () => (getToken() !== null)
};

export default auth;