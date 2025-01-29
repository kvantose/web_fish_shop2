import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
