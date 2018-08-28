import localStorage from "./localstorage";

const getToken = () => localStorage.get('accesstoken');
const setToken = (token) => localStorage.set('accesstoken', token);
const removeToken = () => localStorage.remove('accesstoken');

export { getToken, setToken, removeToken };