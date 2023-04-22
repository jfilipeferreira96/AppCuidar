import axios from 'axios';

const host =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.67:8080' //NOTA: AQUI COLOCA O SEU IPV4 LOCAL!
    : 'https://appcuidar-api.onrender.com';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: host,
});

export default api;
