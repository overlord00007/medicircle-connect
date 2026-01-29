import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Vite proxy handles redirection to localhost:8000
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
