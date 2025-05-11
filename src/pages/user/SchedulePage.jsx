import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from 'react-toastify';

const SchedulePage = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [formError, setFormError] = useState("");  // for additional validation messages

  // Helper function to clear form and reset error
  const resetForm = () => {
    setDeliveryAddress("");
    setScheduledDate("");
    setFormError("");
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    setFormError(""); // Clear previous error messages

    // Validate inputs
    if (!scheduledDate || !deliveryAddress || cartItems.length === 0) {
      setFormError("All fields are required, and there must be items in your cart.");
      toast.error("All fields are required and cart must not be empty.");
      return;
    }

    const payload = {
      items: cartItems.map((item) => ({
        productId: item.productId || item._id,
        quantity: item.quantity,
      })),
      deliveryAddress,
      scheduledDate,
    };

    setLoading(true);
    try {
      const res = await axios.post("/api/schedule/create", payload, {
        withCredentials: true,
      });

      toast.success("Scheduled delivery created!");
      setCartItems([]); // Clear cart after successful scheduling
      resetForm(); // Reset the form fields
      navigate("/my-schedules"); // Navigate to user's schedule page
    } catch (error) {
      console.error(error);
      toast.error("Failed to create schedule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Schedule Your Delivery</h2>

      {/* Display error message if any */}
      {formError && <div className="text-red-600 mb-4">{formError}</div>}

      <form onSubmit={handleSchedule} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Delivery Address</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="e.g., Hotel ABC, Room 302"
            required
            disabled={loading}  // Disable while loading
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Select Delivery Date & Time</label>
          <input
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)} // Ensure it can't be a past date
            className="w-full p-3 border rounded-lg"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
            disabled={loading}  // Disable while loading
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Scheduling..." : "Confirm Schedule"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Cart Summary</h3>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between border p-2 rounded">
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
