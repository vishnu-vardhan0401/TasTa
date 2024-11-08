import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/GlobalState';

function AdminPrtected({ children }) {
  const { adminAuth, loading } = useAuth(); // Access loading and adminAuth

  // Prevent rendering or redirecting until loading is false and adminAuth is set
  if (loading) {
    return <div>Loading...</div>;  // Show a loading indicator if data is still being fetched
  }

  // If user is admin, render children (AdminDash), else redirect to home
  return adminAuth ? children : <Navigate to="/" />;
}

export default AdminPrtected;

