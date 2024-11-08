// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/GlobalState';
import Tasks from './Tasks';

function ProtectedRoute({children}) {
  const { isAuthenticated } = useAuth();

  return <>
  {isAuthenticated ? children : <Navigate to="/" />};
  
  </>
  
}

export default ProtectedRoute;
