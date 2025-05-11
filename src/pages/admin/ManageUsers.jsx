import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/admins/users', { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axiosInstance.delete(`/admins/users/${id}`, { withCredentials: true });
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      toast.error('Failed to delete user');
    }
  };

  const handleBlockToggle = async (id, isBlocked) => {
    try {
      await axiosInstance.put(`/admins/users/block/${id}`, {}, { withCredentials: true });
      setUsers(prev =>
        prev.map(user =>
          user._id === id ? { ...user, isBlocked: !isBlocked } : user
        )
      );
      toast.success(`User ${isBlocked ? 'unblocked' : 'blocked'}`);
    } catch (err) {
      console.error('Block/unblock error:', err.response?.data || err.message);
      toast.error('Failed to update user status');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-10">Loading users...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`text-sm font-semibold ${user.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b flex justify-center items-center space-x-2">
                    <button
                      aria-label="Toggle block status"
                      onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                      className={`px-3 py-1 rounded text-white ${user.isBlocked ? 'bg-yellow-500' : 'bg-green-600'}`}
                    >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      aria-label="Delete user"
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
