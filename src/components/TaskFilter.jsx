import React from 'react';
import AdminDash from './AdminDash';

function TaskFilter({ onFilterChange }) {
  const handleChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex justify-center mb-4 my-4">
      <label htmlFor="statusFilter" className="mr-2 font-semibold">Filter by Status:</label>
      <select
        id="statusFilter"
        onChange={handleChange}
        className="border border-gray-300 rounded p-2 outline-none"
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Started">Started</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
      </select>
      <AdminDash/>
    </div>
  );
}

export default TaskFilter;
