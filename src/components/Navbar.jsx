import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/GlobalState';

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="h-16 bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg flex justify-between items-center px-6">
      <div className="text-white font-bold text-xl">
        <Link to={'/dashboard'} className="hover:text-gray-200 transition duration-300">
          DashBoard
        </Link>
      </div>
      <div className="flex items-center gap-6">
     
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
