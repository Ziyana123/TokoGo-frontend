import React, { useEffect, useState } from "react";
import { getCategories } from "../services/homeService";

const PopularCategories = ({ selectedCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log("Fetched categories:", data); 
        setCategories([{ _id: 'all', name: 'All' }, ...data]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="mb-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">Categories</h2>
      
      {loading && <div className="text-center text-gray-600">Loading categories...</div>}  {/* Loading indicator */}
      {error && <div className="text-center text-red-500">{error}</div>}  {/* Error message */}

      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {categories.map((category, index) => (
          <button
            key={category._id || index}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 
              ${selectedCategory === category._id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white'}
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            onClick={() => onCategorySelect(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
