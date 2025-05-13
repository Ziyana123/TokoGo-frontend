import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserRoute from './routes/useUserRoute';
import useAdminRoutes from './routes/useAdminRoutes';
import AdminRegister from './pages/admin/AdminRegister';

function App() {
  const { user, loading, guestView } = useAuth();

  const userRoutes = useUserRoute();
  const adminRouteList = useAdminRoutes() || [];

  const routes = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Signup /> },
    { path: '/admin/register-admin', element: <AdminRegister /> },
    ...adminRouteList, // Admin routes
    ...userRoutes, // User routes
  ]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {routes}
    </>
  );
}

export default App;
