import React, { useState } from "react";
import axiosInstance from '../../axiosInstance'; 
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const SmartPackBuilder = () => {
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState({ from: "", to: "" });
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    if (!destination || !travelDates.from || !travelDates.to || preferences.length === 0) {
      toast.error("Please fill all fields and select preferences");
      return;
    }
  
    try {
      const res = await axiosInstance.post("/travelpack/build", {
        destination,
        travelDates,
        preferences,
      }, { withCredentials: true });
  
      console.log("Smart Pack Products:", res.data.products);
      console.log("Total Cost:", res.data.travelPack.totalEstimatedCost);
      toast.success("Smart Travel Pack built successfully!");
      navigate('/my-packs');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-xl my-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Build Your Smart Travel Pack</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Enter destination"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600">Travel Dates</label>
            <div className="flex space-x-4 mt-2">
              <input
                type="date"
                value={travelDates.from}
                onChange={(e) => setTravelDates({ ...travelDates, from: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={travelDates.to}
                onChange={(e) => setTravelDates({ ...travelDates, to: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Preferences (Tags)</label>
          <input
            type="text"
            value={preferences.join(", ")}
            onChange={(e) => setPreferences(e.target.value.split(",").map(tag => tag.trim()))}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter preferences (comma separated) (e.g., Snacks, Chocolates, Toiletries)"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Build Pack
          </button>
        </div>
      </form>
    </div>
  );
};

export default SmartPackBuilder;
