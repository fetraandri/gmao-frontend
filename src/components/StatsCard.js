import React from 'react';

const StatsCard = ({ title, value, color, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div
          className="p-3 rounded-full"
          style={{ backgroundColor: color, color: '#fff' }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;