import React from 'react';
import StatusBadge from './StatusBadge';
import Button from './Button';

function IssueCard({ 
  id,
  title, 
  category, 
  status, 
  location, 
  date, 
  imageUrl,
  onViewDetails 
}) {

  const defaultImage = "https://images.unsplash.com/photo-1601027847350-0285867c31f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="issue-card">
      <img 
        src={imageUrl || defaultImage} 
        alt={title} 
        className="issue-card-img" 
      />
      <div className="issue-card-content">
        <div>
          <div className="issue-card-header">
            <span className="category-pill">{category}</span>
            <StatusBadge status={status} />
          </div>
          <h3 className="issue-card-title">{title}</h3>
        </div>

        <div className="issue-card-meta" style={{ marginTop: '0.8rem' }}>
          <span>📍 {location}</span>
          <span>📅 Reported: {date}</span>
        </div>

        <div className="issue-card-footer">
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>ID: #{id}</span>
          {onViewDetails && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(id)}
            >
              View Details →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueCard;
