// Gamer.js
import React from 'react';
import {Navigate } from 'react-router-dom';
import { useAuth } from '../Context/GlobalState';
import Tasks from './Tasks';

function Gamer({children}) {
  const { isAuthenticated } = useAuth();

  return <>
  {!isAuthenticated ? children : <Navigate to="/tasks" />};
  
  </>
  
}

export default Gamer;