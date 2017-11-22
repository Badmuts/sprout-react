import http from '../store/http';

export const findAdvertisements = (query) => http.get('/advertisements', { params: query})