// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tokogo-backend.onrender.com/api',
  timeout: 20000,
  withCredentials: true,
});

export default axiosInstance;
