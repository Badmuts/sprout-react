const getToken = () => window.localStorage.getItem('accesstoken');
const setToken = (token) => window.localStorage.setItem('accesstoken', token);

export { getToken, setToken };