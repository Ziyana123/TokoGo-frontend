
import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageCategories from '../pages/admin/ManageCategories';
import ManageUsers from '../pages/admin/ManageUsers';
import AdminSchedules from '../pages/admin/ManageSchedulesAdmin';
import CreateProduct from '../pages/admin/CreateProduct';
import EditProduct from '../pages/admin/EditProduct';
import AdminRegister from '../pages/admin/AdminRegister';
import SharedRoute from './SharedRoute';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, guestView ,loading} = useAuth();

  if (loading) return null; 

  if (!user || user.role !== 'admin' || guestView) {
    return [
      {
        path: "/admin/*",
        element: <Navigate to="/" replace />,
      },
    ];
  }



  return [
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { path: '', element: <Navigate to="dashboard" /> },
        // { path: 'register-admin', element: <AdminRegister /> },
        { path: 'dashboard', element: <SharedRoute allowedRoles={['admin']}><AdminDashboard /></SharedRoute> },
        { path: 'products', element: <SharedRoute allowedRoles={['admin']}><ManageProducts /></SharedRoute> },
        { path: 'categories', element: <SharedRoute allowedRoles={['admin']}><ManageCategories /></SharedRoute> },
        { path: 'users', element: <SharedRoute allowedRoles={['admin']}><ManageUsers /></SharedRoute> },
        { path: 'manage-schedules', element: <SharedRoute allowedRoles={['admin']}><AdminSchedules /></SharedRoute> },
        { path: 'products/create', element: <SharedRoute allowedRoles={['admin']}><CreateProduct /></SharedRoute> },
        { path: 'products/edit/:id', element: <SharedRoute allowedRoles={['admin']}><EditProduct /></SharedRoute> },
      ],
    },
  ];
};
export default AdminRoute;
