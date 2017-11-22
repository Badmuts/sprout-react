const getToken = () => window.localStorage.getItem('sprout.accesstoken');
const setToken = (token) => window.localStorage.setItem('sprout.accesstoken', token);
const removeToken = () => window.localStorage.removeItem('sprout.accesstoken');

export { getToken, setToken, removeToken };