import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance'; 
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const EditPack = () => {
  const { id } = useParams(); 
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPackDetails = async () => {
    try {
      const response = await axiosInstance.get(`/travelpack/${id}`);
      setPack({
        ...response.data,
        preferences: Array.isArray(response.data.preferences)
          ? response.data.preferences.join(", ")
          : response.data.preferences
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch pack details.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedPack = {
        ...pack,
        travelDates: {
          from: new Date(pack.travelDates.from),
          to: new Date(pack.travelDates.to)
        },
        preferences: typeof pack.preferences === 'string'
          ? pack.preferences.split(',').map(p => p.trim())
          : pack.preferences
      };
      await axiosInstance.put(`/travelpack/${id}`, updatedPack); 
      toast.success('Pack updated successfully.');
      navigate('/my-packs'); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to update pack.');
    }
  };

  useEffect(() => {
    fetchPackDetails();
  }, [id]);

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().slice(0, 10) : '';
  };

  if (loading || !pack) {
    return <div className="text-center py-10">Loading pack details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Smart Travel Pack</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Destination</label>
          <input
            type="text"
            value={pack.destination}
            onChange={(e) => setPack({ ...pack, destination: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter destination"
          />
        </div>
        <div className="mb-4 md:flex md:space-x-6">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium">Travel Date From</label>
            <input
              type="date"
              value={new Date(pack.travelDates.from).toISOString().slice(0, 10)}
              onChange={(e) =>
                setPack({
                  ...pack,
                  travelDates: { ...pack.travelDates, from: e.target.value }
                })
              }
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium">Travel To Date</label>
            <input
              type="date"
              value={new Date(pack.travelDates.to).toISOString().slice(0, 10)}
              onChange={(e) =>
                setPack({
                  ...pack,
                  travelDates: { ...pack.travelDates, to: e.target.value }
                })
              }
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Preferences (Comma Separated)</label>
          <input
            type="text"
            value={pack.preferences}
            onChange={(e) => setPack({ ...pack, preferences: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter preferences (e.g., Snacks, Chocolates, Toiletries)"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPack;
