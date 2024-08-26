import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',  // Adjust the base URL according to your backend server
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
