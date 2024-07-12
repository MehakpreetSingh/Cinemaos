import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from './AuthContext'; // If you're using context

export function ProtectedRoute({ children }) {
  const location = useLocation();

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("user") || sessionStorage.getItem('user');

  if (!isLoggedIn) {
    // Redirect to the home page if not logged in
    return <Navigate to="/" state={{ from: location }} replace />; 
  }

  // If logged in, render the original children (the protected component)
  return children;
}