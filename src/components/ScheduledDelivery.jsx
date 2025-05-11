import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduledDelivery = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-green-100 p-6 rounded-2xl shadow-md text-center space-y-4">
      <h2 className="text-3xl font-bold text-green-800">Schedule Your Delivery</h2>
      <p className="text-gray-700 max-w-xl mx-auto">
        Planning a trip soon? Schedule your delivery in advance and travel stress-free. Pick your items, choose a date, and we’ll take care of the rest.
      </p>
      <button
        onClick={() => navigate('/schedule')}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        Schedule Now
      </button>
    </section>
  );
};

export default ScheduledDelivery;
