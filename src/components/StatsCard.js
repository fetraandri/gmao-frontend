// src/components/StatsCard.js
import React from 'react';

const StatsCard = ({ title, value, color, icon }) => {
  return (
    <div className="stats-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stats-card-header">
        {icon && <span className="stats-card-icon">{icon}</span>}
        <h3>{title}</h3>
      </div>
      <p>{value}</p>
    </div>
  );
};

export default StatsCard;