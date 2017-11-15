import { getToken } from './token';

const auth = {
    isAuthenticated: function() {
        return (getToken() !== null)
    }
};

export default auth;