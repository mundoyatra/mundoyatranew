import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mundoyatra_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('mundoyatra_admin_token');
      localStorage.removeItem('mundoyatra_admin_username');
      if (
        window.location.pathname.startsWith('/admin') &&
        window.location.pathname !== '/admin/login'
      ) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getAdminToken = () => localStorage.getItem('mundoyatra_admin_token');
export const getAdminUsername = () => localStorage.getItem('mundoyatra_admin_username');
export const isAdminAuthenticated = () => !!getAdminToken();

export const setAdminSession = (token, username) => {
  localStorage.setItem('mundoyatra_admin_token', token);
  localStorage.setItem('mundoyatra_admin_username', username);
};

export const clearAdminSession = () => {
  localStorage.removeItem('mundoyatra_admin_token');
  localStorage.removeItem('mundoyatra_admin_username');
};
