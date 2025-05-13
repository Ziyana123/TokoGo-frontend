import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  LayoutDashboard,
  PackageSearch,
  Users,
  ListOrdered,
  LogOut,
  Globe,
  Shield,
  Calendar,
} from 'lucide-react';

const Sidebar = () => {
  const { logout, guestView, enableGuestView, disableGuestView, user } = useAuth();
  const navigate = useNavigate();

  const handleGoToSite = () => {
    enableGuestView();
    navigate('/');
    toast.info('You are now viewing the public site');
  };

  const handleViewAsAdmin = () => {
    disableGuestView();
    toast.info('You have switched back to the Admin view');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition ${isActive ? 'bg-gray-700' : ''
    }`;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6 shadow-lg">
      <div className="mb-10 text-center">
        <Shield className="w-10 h-10 mx-auto text-blue-400" />
        <h2 className="text-2xl font-bold mt-2">Admin Panel</h2>
      </div>

      {!guestView && user?.role === 'admin' && (
        <ul className="space-y-2">
          <li>
            <NavLink to="/admin/dashboard" className={linkStyle}>
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" className={linkStyle}>
              <PackageSearch className="w-5 h-5" />
              Manage Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories" className={linkStyle}>
              <ListOrdered className="w-5 h-5" />
              Manage Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={linkStyle}>
              <Users className="w-5 h-5" />
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-schedules" className={linkStyle}>
            <Calendar className='w-5 h-5' />
              Manage Schedules
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleGoToSite}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              <Globe className="w-5 h-5" />
              Go to Site
            </button>
          </li>
        </ul>
      )}

      {guestView && (
        <div className="bg-gray-800 p-4 mt-6 rounded-lg text-center">
          <p className="mb-3">You are viewing as a guest.</p>
          <button
            onClick={handleViewAsAdmin}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Switch to Admin View
          </button>
        </div>
      )}

      {!guestView && (
        <ul className="mt-10">
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
