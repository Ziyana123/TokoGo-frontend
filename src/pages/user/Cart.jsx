import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { user, guestView } = useAuth();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleProceedToCheckout = () => {
    if (!user || guestView) {
      toast.warning('You must log in to proceed to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-xl font-medium text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white">
              <div className="flex items-center gap-4">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="text-md font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">${item.price} each</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-800 transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h4 className="text-2xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</h4>
            <button
              onClick={handleProceedToCheckout}
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
