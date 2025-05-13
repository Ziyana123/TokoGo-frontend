

// import React from 'react';
// import { useLocation, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const SharedRoute = ({ children, allowedRoles }) => {
//   const { user, guestView, loading } = useAuth();
//   const location = useLocation();

//   if (!user && !guestView && allowedRoles)  return <Navigate to="/login" replace state={{ from: location }} />;

//   if (allowedRoles && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default SharedRoute;


import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SharedRoute = ({ children, allowedRoles }) => {
  const { user, guestView, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user && !guestView) {
    console.log('🔒 No user or guest, redirecting to login');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    console.log(`🚫 Role not allowed: ${user?.role}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SharedRoute;
