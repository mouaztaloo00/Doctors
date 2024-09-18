import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
