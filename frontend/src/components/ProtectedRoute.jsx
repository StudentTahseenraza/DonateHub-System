import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Check if user is logged in
  return token ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not logged in
};

export default ProtectedRoute;