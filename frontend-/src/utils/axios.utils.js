import axios from 'axios';

import authHeader from './auth-header';
import AuthService from './auth.util';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const axios_instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  //withCredentials: true,
});

axios_instance.interceptors.request.use(
  (config) => {
    config.headers = { ...config.headers, ...authHeader() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios_instance;
