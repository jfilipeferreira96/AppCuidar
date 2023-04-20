import axios from 'axios';

const api = axios.create({
  baseURL: 'https://appcuidar.onrender.com',
});

export default api;

//local teste
/* export function Signin() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'ALeKk02G0qQyeFUIPxUx1xiaaCNsi_e2Yew',
        user: {
          name: 'Thiago Bueno',
          email: 'thiago@nerdetcetera.com',
        },
      });
    }, 2000);
  });
} */
