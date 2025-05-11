import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}  // Initial state: transparent and slightly below
        animate={{ opacity: 1, y: 0 }}  // Animate to full opacity and original position
        transition={{ duration: 0.5 }}  // Duration of the animation
      >
        <h1 className="text-3xl font-extrabold text-green-700 mb-4">🎉 Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <p className="text-sm text-gray-500 mb-6">We’ve sent a confirmation to your email.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Home
        </button>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
