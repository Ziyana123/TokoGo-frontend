import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const PersonalizedRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);

      if (!user) {
        setRecommendations([]);
        setLoading(false);
        return;
      }

      try {
        const localPacks = JSON.parse(localStorage.getItem('allTravelPacks'));
        let recs = [];

        if (localPacks?.length > 0) {
          for (const pack of localPacks) {
            const res = await axios.post('https://tokogo-backend.onrender.com/api/ai/generate', pack, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${user.token}`, // Pass the token if needed
              }
            });
            recs.push(...res.data.products);
          }
        } else {
          const res = await axios.get('https://tokogo-backend.onrender.com/api/ai/my-recommendations', {
            headers: {
              Authorization: `Bearer ${user.token}`  // Assuming 'user.token' is the JWT token
            },
            withCredentials: true,
          });
          recs = res.data[0]?.recommendedItems || [];
        }

        // Remove duplicates by _id
        const uniqueRecs = Array.from(new Map(recs.map(p => [p._id, p])).values());
        setRecommendations(uniqueRecs);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (!user || loading) return null;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm my-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Personalized Picks Just for You 🌟
      </h2>

      {loading ? (
        <div className="text-center py-10 text-gray-600 animate-pulse">Loading recommendations...</div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendations.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="font-semibold text-lg mt-3 text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recommendations available.</p>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;
