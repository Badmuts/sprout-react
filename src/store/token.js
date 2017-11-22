const getToken = () => window.localStorage.getItem('sprout.accesstoken');
const setToken = (token) => window.localStorage.setItem('sprout.accesstoken', token);

export { getToken, setToken };