// frontend/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.isAdmin) {
    return children;
  }

  return <Navigate to="/" replace />; // Redirect non-admins
};

export default AdminRoute;