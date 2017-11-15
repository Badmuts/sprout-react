import http from '../store/http';

export const findAdvertisements = () => http.get('/advertisements')