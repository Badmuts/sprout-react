import axios from 'axios';
import { getToken } from './token';

const http = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Authorization': `Bearer ${getToken() || ""}`}
});

export const createHttp = () => {
	const ax = axios.create({
	    baseURL: 'http://localhost:3000'
	})

	ax.interceptors.request.use(config => {
		if (getToken()) {
			config.headers["Authorization"] = `Bearer ${getToken()}`;
		}
		return config;
	})

	return ax;
}

export default http;