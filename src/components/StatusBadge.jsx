import React from 'react';

function StatusBadge({ status }) {
  let badgeClass = 'badge-pending';
  
  if (status === 'Assigned') {
    badgeClass = 'badge-assigned';
  } else if (status === 'In Progress') {
    badgeClass = 'badge-in-progress';
  } else if (status === 'Resolved') {
    badgeClass = 'badge-resolved';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      • {status}
    </span>
  );
}

export default StatusBadge;
