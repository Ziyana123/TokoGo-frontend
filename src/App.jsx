import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoute from './routes/UserRoute';
import adminRoutes from './routes/adminRoutes';
import AdminRegister from './pages/admin/AdminRegister';


function App() {
  const { user, loading, guestView  } = useAuth();


  const routes = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Signup /> },
    { path: '/admin/register-admin', element: <AdminRegister />},
      ...(user?.role === 'admin' && !guestView ? adminRoutes : []),
     ...UserRoute({ user, guestView }),
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
