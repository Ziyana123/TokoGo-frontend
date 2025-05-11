import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product , onClick }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to add items to the cart.');
      return;
    }
    addToCart(product);
    toast.success('Item added to cart!');
  };

  return (
    <div onClick={() => onClick(product)} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Product Image */}
      <div className="w-full h-60 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>

        {/* Bottom Price & Button aligned */}
        <div className="mt-auto pt-4 flex justify-between items-center">
          <span className="text-[12px] font-bold text-gray-500">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => handleAddToCart(e)}
            disabled={product.stock === 0}
            className={`px-4 py-2 rounded-md text-sm font-semibold shadow transition-all ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
