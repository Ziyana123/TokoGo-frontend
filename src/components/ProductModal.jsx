import React, { useState, useEffect } from "react";
import axios from '../axiosInstance';
import { useAuth } from '../context/AuthContext';
import StarRating from "./StarRating";
import { toast } from 'react-toastify';
import { Edit, Trash2, X } from 'lucide-react';

const ProductModal = ({ product, onClose, addToCart }) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [currentlyEditingReviewId, setCurrentlyEditingReviewId] = useState(null);

  useEffect(() => {
    if (activeTab === "reviews" && product?._id) {
      fetchReviews();
    }
  }, [activeTab, product]);

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const res = await axios.get(`/review/${product._id}`);
      setReviews(res.data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddReview = async () => {
    if (!newReview.trim()) return;
    if (rating === 0) return toast.error("Please select a rating.");
    if (!token) return console.error('No token found');

    try {
      if (currentlyEditingReviewId) {
        await axios.put(`/review/${currentlyEditingReviewId}`, {
          rating,
          comment: newReview,
          userId: user._id,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Review updated successfully!');
      } else {
        await axios.post(`/review/${product._id}`, {
          rating,
          comment: newReview,
          userId: user._id,
        });
        toast.success('Review submitted successfully!');
      }
      resetReviewState();
      fetchReviews();
    } catch (error) {
      console.error("Review error", error);
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await axios.delete(`/review/${reviewId}`);
      toast.success('Review deleted successfully!');
      resetReviewState();
      fetchReviews();
    } catch (error) {
      console.error("Delete error", error);
      toast.error(error.response?.data?.message || 'Failed to delete review');
    }
  };

  const resetReviewState = () => {
    setNewReview("");
    setRating(0);
    setCurrentlyEditingReviewId(null);
  };

  const handleAddToCart = () => {
    addToCart?.(product);
    toast.success(`Product added to cart!`);
  };

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6 py-12 overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] p-8 relative animate-fadeIn overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-300"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Product Image */}
        <div className="mb-6 flex justify-center">
          <img
            src={product.image || product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-contain rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>

        {/* Product Name & Rating */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-3">{product.name}</h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 mb-4 text-gray-600">
            <StarRating rating={averageRating} />
            <span className="text-sm">({reviews.length} review{reviews.length > 1 ? 's' : ''})</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-6 border-b pb-4 mb-6 border-gray-200">
          {['description', 'reviews'].map(tab => (
            <button
              key={tab}
              className={`capitalize px-3 py-2 text-lg font-medium transition-all duration-300 ${activeTab === tab
                  ? 'border-b-4 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-blue-600 hover:border-b-4 hover:border-blue-500'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && (
          <div className="text-gray-700 mb-6">
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-primary">${product.price ?? '0.00'}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            {loadingReviews ? (
              <p>Loading reviews...</p>
            ) : (
              <div className="space-y-6">
                {/* Review List */}
                {reviews.length ? (
                  <ul className="max-h-56 overflow-y-auto space-y-4 pr-1">
                    {reviews.map(review => (
                      <li key={review._id} className="border-b pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <strong className="text-lg">{review.userId?.name || 'Anonymous'}</strong>
                            <StarRating rating={review.rating} />
                          </div>
                          {review.userId?._id === user?._id && (
                            <div className="flex gap-4">
                              <button onClick={() => {
                                setCurrentlyEditingReviewId(review._id);
                                setNewReview(review.comment);
                                setRating(review.rating);
                              }}>
                                <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800 transition duration-200" />
                              </button>
                              <button onClick={() => handleDeleteReview(review._id)}>
                                <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 transition duration-200" />
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-gray-600">{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}

                {/* Add/Edit Review */}
                <div className="mt-6">
                  <StarRating rating={rating} onRatingChange={setRating} />
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full border border-gray-300 rounded-lg p-4 mt-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows={4}
                  />
                  <button
                    onClick={handleAddReview}
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-4"
                  >
                    {currentlyEditingReviewId ? "Update Review" : "Submit Review"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>


  );
};

export default ProductModal;
