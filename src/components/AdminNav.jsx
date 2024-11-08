import React, { useState } from 'react';
import { useAuth } from '../Context/GlobalState';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function AdminNav() {
  const { logout, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Toggle state for mobile menu

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>

        {/* Hamburger Icon for mobile screens */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu items (hidden on small screens) */}
        <div className="hidden md:flex gap-5">
          <Link to="/" className="hover:underline">All Tasks</Link>
          <button onClick={logout} className="hover:underline">Logout</button>
        </div>
      </div>

      {/* Mobile menu (visible only when isOpen is true) */}
      {isOpen && (
        <div className="flex flex-col mt-4 md:hidden gap-3">
          <Link to="/" className="hover:underline">All Tasks</Link>
          <button onClick={logout} className="hover:underline">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default AdminNav;
