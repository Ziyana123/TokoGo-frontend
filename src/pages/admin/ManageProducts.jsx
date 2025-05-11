import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('/products', { withCredentials: true });
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        toast.error("Invalid product data received");
        setProducts([]);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/products/${id}`, { withCredentials: true });
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
        <button
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-300"
          onClick={() => navigate('/admin/products/create')}
        >
          + Add Product
        </button>
      </div>

      {/* Product Table */}
      {products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 border rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-800 text-left">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Price</th>
                <th className="px-4 py-3 border">Stock</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border font-medium">{product.name}</td>
                  <td className="px-4 py-3 border">${product.price}</td>
                  <td className="px-4 py-3 border">{product.stock}</td>
                  <td className="px-4 py-3 border space-x-2">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-full text-sm shadow-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm shadow-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4 text-center">No products available.</p>
      )}
    </div>
  );
};

export default ManageProducts;
