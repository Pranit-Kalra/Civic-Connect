import React from 'react';

function StatCard({ title, value, icon = '📊' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-details">
        <h4>{title}</h4>
        <div className="number">{value}</div>
      </div>
    </div>
  );
}

export default StatCard;