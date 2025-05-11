import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance'; 
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';

const MyPacks = () => {
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyPacks = async () => {
    try {
      const response = await axiosInstance.get('/travelpack/my-packs');
      setPacks(response.data); 
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch your Smart Packs.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pack?')) {
      try {
        await axiosInstance.delete(`/travelpack/${id}`);
        toast.success('Pack deleted successfully.');
        setPacks(packs.filter((pack) => pack._id !== id));
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete the pack.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/smartpack/edit/${id}`); 
  };

  useEffect(() => {
    fetchMyPacks();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading your Smart Packs...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Smart Travel Packs</h2>
      {packs.length === 0 ? (
        <div className="text-center text-gray-600">
          No packs found. <Link to="/smartpack/build" className="text-blue-600 underline">Create one</Link>.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div key={pack._id} className="border rounded-lg p-4 shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{pack.destination}</h3>
              <p><strong>Travel Date From:</strong> {formatDate(pack.travelDates.from)}</p>
              <p><strong>Travel Date To:</strong> {formatDate(pack.travelDates.to)}</p>
              <p><strong>Preferences:</strong> {pack.preferences ? pack.preferences.join(", ") : 'None'}</p>

              <div className="mt-4 flex justify-between space-x-4">
                <button
                  onClick={() => handleEdit(pack._id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pack._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPacks;
