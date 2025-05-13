import axios from 'axios';

// Set up API base URL to point to the backend
const API_URL = 'https://tokogo-backend.onrender.com/api'; // Replace with your actual backend URL

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
  const token = localStorage.getItem('token'); // Ensure token is available
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/ai/my-recommendations`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in the Authorization header
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
