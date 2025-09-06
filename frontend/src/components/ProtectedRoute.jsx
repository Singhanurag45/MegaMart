// frontend/src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to the signin page
    return <Navigate to="/signin" replace />;
  }

  // If token exists, render the child component (e.g., ProfilePage)
  return children;
};

export default ProtectedRoute;
