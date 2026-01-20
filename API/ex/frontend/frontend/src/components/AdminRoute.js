import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../api/auth';
import Loader from './Loader';

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.is_staff) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;