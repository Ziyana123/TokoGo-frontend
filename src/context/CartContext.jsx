import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from '../axiosInstance';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading } = useAuth();  
  const [cartItems, setCartItems] = useState([]);



  const fetchCart = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get('/cart', { withCredentials: true });
      setCartItems(data.items || []);
      if (!user) {
        localStorage.setItem('cartItems', JSON.stringify(data.items));
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      fetchCart();
    } else {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(savedCartItems);
    }
  }, [user, loading]);


  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        '/cart/add',
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      const cartRes = await axios.get('/cart', { withCredentials: true });
      setCartItems(cartRes.data.items || []);
      if (!user) {
      localStorage.setItem('cartItems', JSON.stringify(cartRes.data.items || []));
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/remove/${productId}`, { withCredentials: true });
      const { data } = await axios.get('/cart', { withCredentials: true });
      setCartItems(data.items || []);
      // Update localStorage after removing from cart
      if (!user) {
      localStorage.setItem('cartItems', JSON.stringify(data.items));
      }
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data || error.message);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; 
  
    try {
      await axios.put('/cart/update', { productId, quantity }, { withCredentials: true });
      const { data } = await axios.get('/cart', { withCredentials: true });
      setCartItems(data.items || []);
  
      if (!user) {
        localStorage.setItem('cartItems', JSON.stringify(data.items));
      }
    } catch (error) {
      console.error("Error updating cart:", error.response?.data || error.message);
    }
  };

  const resetCart = async () => {
    try {
      await axios.delete('/cart/clear', { withCredentials: true });
      setCartItems([]);
      // Clear localStorage when cart is reset
      localStorage.removeItem('cartItems');
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error.message);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  
  const clearCartLocally = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, resetCart, cartCount, fetchCart, clearCartLocally ,setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
