import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../api/auth';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;