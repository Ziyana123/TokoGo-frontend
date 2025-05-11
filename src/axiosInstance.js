// axiosInstance.js
import axios from 'axios';
import { useAuth } from './context/AuthContext'

const axiosInstance = axios.create({
  baseURL: 'https://tokogo-backend.onrender.com/api',
  timeout: 20000,
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuth(); 

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the header if available
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default axiosInstance;
