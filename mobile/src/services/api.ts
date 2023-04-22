import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://localhost:8080',
});

export default api;
