import axios from 'axios';

// Set up API base URL if needed
const API_URL =  'http://localhost:3000/api';

// Function to get products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to get categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to get personalized recommendations (AI-based)
export const getPersonalizedRecommendation = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/ai/my-recommendations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assumes the token is stored in localStorage
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching personalized recommendations:', error);
    throw error;
  }
};

// Optional: If you need specific fetches for other features like smart travel pack
export const getSmartTravelPack = async () => {
  try {
    const response = await axios.get(`${API_URL}/travelpack`);
    return response.data;
  } catch (error) {
    console.error('Error fetching smart travel pack:', error);
    throw error;
  }
};
