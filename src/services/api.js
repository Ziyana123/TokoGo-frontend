
import axios from 'axios';

// const API_URL = 'http://localhost:3000/api'; // Replace with actual API URL

// export const getProducts = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data; // assuming the response is an array of products
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };
const instance = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true, 
});

export default instance;