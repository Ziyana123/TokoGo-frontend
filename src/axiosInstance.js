import axios from 'axios';
import { getToken } from './context/AuthContext';

const axiosInstance = axios.create({
  baseURL: 'https://tokogo-backend.onrender.com/api',
  timeout: 20000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken(); // Get token directly
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
