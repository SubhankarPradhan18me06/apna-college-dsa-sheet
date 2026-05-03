import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import Spinner from './Spinner';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // If we have a user in store, we're good
  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  // Otherwise redirect to login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
