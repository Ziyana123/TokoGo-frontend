import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../axiosInstance';
import { useCart } from '../../context/CartContext';
import { CircleLoader } from 'react-spinners';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { shippingInfo } = location.state || {};
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const { cartItems, setCartItems } = useCart();
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    if (!shippingInfo) {
      navigate('/checkout');
    }
    if (!cartItems || cartItems.length === 0) {
      if (!isRedirected) {
        navigate('/cart');
      }
    }
  }, [shippingInfo, cartItems, navigate, isRedirected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError('');

    const cardElement = elements.getElement(CardElement);
    const { token, error: stripeError } = await stripe.createToken(cardElement);

    if (stripeError) {
      setError(stripeError.message);
      setIsProcessing(false);
      return;
    }

    const amount = cartItems.reduce((acc, item) => {
      const price = item?.product?.price || item?.productId?.price || item?.price || 0;
      return acc + price * item.quantity;
    }, 0);

    const sanitizedItems = cartItems.map((item) => {
      const id = item._id;
      return id ? { productId: id, quantity: item.quantity } : null;
    }).filter(Boolean);

    try {
      const paymentResult = await axios.post(
        '/payment',
        {
          token: token.id,
          amount,
          items: sanitizedItems,
          address: `${shippingInfo.name}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}, ${shippingInfo.country}`,
          deliveryDate: null,
          deliveryType: 'standard',
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (paymentResult.data.success) {
        // No need to call separate order creation
        setCartItems([]);
        setIsRedirected(true);
        navigate('/order-confirmation', {
          state: { orderId: paymentResult.data.orderId },
        });
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="border p-4 rounded" />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          {isProcessing ? <CircleLoader color="#fff" size={20} /> : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default StripePayment;
