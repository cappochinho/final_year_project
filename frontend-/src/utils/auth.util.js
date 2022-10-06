// Services to handle authentication

import axios from 'axios';

const AUTH_API_URL = import.meta.env.VITE_BASE_API_URL;

const auth_axios = axios.create({
  baseURL: AUTH_API_URL,
});

const setUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user));
};

const setAccessToken = (token) => {
  window.localStorage.setItem('accessToken', token);
};

const setRefreshToken = (token) => {
  window.localStorage.setItem('refreshToken', token);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const getAccessToken = () => {
  return window.localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return window.localStorage.getItem('refreshToken');
};

const login = async (username, password) => {
  return await auth_axios
    .post('token/', {
      username,
      password,
    })
    .then((res) => {
      if (res.data.access) {
        setAccessToken(res.data.access);
      }
      if (res.data.refresh) {
        setRefreshToken(res.data.refresh);
      }
      return res;
    });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const refreshToken = async () => {
  return await auth_axios.post('token/refresh/', {
    refresh: getRefreshToken(),
  });
};

const AuthService = {
  auth_axios,
  login,
  logout,
  refreshToken,
  setUser,
  setAccessToken,
  setRefreshToken,
  getCurrentUser,
  getAccessToken,
  getRefreshToken,
};

export default AuthService;
