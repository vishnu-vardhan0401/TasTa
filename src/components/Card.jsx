// src/components/Card.js

import React from 'react';

const Card = ({ title, description, status, assignee, dueDate }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-xl">{title}</h2>
        <span className={`text-xs font-semibold ${status === 'Done' ? 'text-green-600' : 'text-yellow-600'}`}>
          {status}
        </span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between items-center text-gray-500">
        <span>Assigned to: {assignee}</span>
        <span>Due: {dueDate}</span>
      </div>
    </div>
  );
};

export default Card;
