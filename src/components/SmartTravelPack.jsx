import { useNavigate } from 'react-router-dom';


const SmartTravelPack = () => {
  const navigate = useNavigate();

  const handleBuildPackClick = () => {
    navigate('/smartpack/build');
  };

  return (
    <div className="bg-white shadow p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-3">Smart Travel Pack 🧳</h2>
      <p className="text-gray-500 mb-4">Build your personalized pack based on your trip!</p>
      <button
        onClick= {handleBuildPackClick} 
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition"
      >
        Build My Pack
      </button>
    </div>
  );
};

export default SmartTravelPack;
