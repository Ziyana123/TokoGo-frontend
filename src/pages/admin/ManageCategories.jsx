import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/categories', { withCredentials: true });
      setCategories(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    try {
      await axiosInstance.post('/categories', { name: newCategory, description }, { withCredentials: true });
      toast.success('Category added');
      setNewCategory('');
      setDescription('');
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding category');
    }
  };

  const handleEdit = async (id) => {
    if (!editValue.trim()) return;
    try {
      await axiosInstance.put(`/categories/${id}`, { name: editValue, description: editDescription }, { withCredentials: true });
      toast.success('Category updated');
      setEditing(null);
      setEditValue('');
      setEditDescription('');
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axiosInstance.delete(`/categories/${id}`, { withCredentials: true });
      toast.success('Category deleted');
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting category');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter category description"
          className="border p-2 rounded w-full md:w-1/2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories found. Add one above.</p>
      ) : (
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat._id} className="p-4 border rounded flex flex-col gap-2">
              {editing === cat._id ? (
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
                    placeholder="Edit name"
                  />
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/2"
                    placeholder="Edit description"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cat._id)}
                      className="text-green-600 font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="text-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <p className="font-semibold text-lg">{cat.name}</p>
                    <p className="text-gray-600 text-sm">{cat.description}</p>
                  </div>
                  <div className="flex gap-4 mt-2 md:mt-0">
                    <button
                      onClick={() => {
                        setEditing(cat._id);
                        setEditValue(cat.name);
                        setEditDescription(cat.description || '');
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCategories;
