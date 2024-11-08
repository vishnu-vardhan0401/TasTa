import React from 'react';
import { useAuth } from '../Context/GlobalState';
import Addtask from './Addtask';
import Navbar from './Navbar';

function Tasks() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="py-12">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Manage Your Tasks</h1>
        <Addtask />
      </div>
    </div>
  );
}

export default Tasks;
