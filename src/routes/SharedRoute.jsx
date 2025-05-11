

import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SharedRoute = ({ children, allowedRoles }) => {
  const { user, guestView  } = useAuth();
  const location = useLocation();

  if (!user && !guestView && allowedRoles)  return <Navigate to="/login" replace state={{ from: location }} />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SharedRoute;
