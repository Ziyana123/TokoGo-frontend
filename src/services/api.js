
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://toko-go-frontend-ko1d.vercel.app', 
  withCredentials: true, 
});

export default instance;