
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueCard from '../../components/IssueCard';

function MyIssues({ issues, currentUser }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  const citizenIssues = currentUser
    ? issues.filter(issue => issue.reportedBy === currentUser.name || issue.citizenId === currentUser.id)
    : issues;

  const displayedIssues = filterStatus === 'All'
    ? citizenIssues
    : citizenIssues.filter(i => i.status === filterStatus);

  const handleViewDetails = (id) => {
    navigate(`/citizen/issues/${id}`);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Submitted Issues</h1>
          <p className="page-subtitle">Track and monitor all your reported complaints in real-time.</p>
        </div>
      </div>

      {}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Assigned', 'In Progress', 'Resolved'].map((status) => (
          <button
            key={status}
            className={`btn btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {displayedIssues.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No issues found matching "{filterStatus}"</h3>
          <p>Try switching to another status tab or report a new issue.</p>
        </div>
      ) : (
        <div className="grid-issues">
          {displayedIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              id={issue.id}
              title={issue.title}
              category={issue.category}
              status={issue.status}
              location={issue.location}
              date={issue.date}
              imageUrl={issue.imageUrl}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyIssues;
