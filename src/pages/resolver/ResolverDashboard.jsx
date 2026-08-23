import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import IssueCard from '../../components/IssueCard';
import StatusBadge from '../../components/StatusBadge';

function ResolverDashboard({ issues, currentUser, onUpdateStatus }) {
  const navigate = useNavigate();

  const assignedIssues = currentUser
    ? issues.filter(issue => issue.assignedTo === currentUser.name || issue.resolverId === currentUser.id)
    : issues.filter(issue => issue.assignedTo !== null);

  const pendingCount = assignedIssues.filter(i => i.status === 'Pending' || i.status === 'Assigned').length;
  const progressCount = assignedIssues.filter(i => i.status === 'In Progress').length;
  const resolvedCount = assignedIssues.filter(i => i.status === 'Resolved').length;

  const handleViewDetails = (id) => {
    navigate(`/resolver/issues/${id}`);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Resolver Portal Dashboard 👋</h1>
          <p className="page-subtitle">Department Worker Console — Manage on-ground maintenance tickets.</p>
        </div>
      </div>

      <div className="alert-banner" style={{ marginBottom: '1.5rem', backgroundColor: '#e0e7ff', borderColor: '#3730a3', color: '#3730a3' }}>
        🛠️ <strong>Resolver Role:</strong> You are logged in as <strong>{currentUser ? currentUser.name : 'Rahul Sharma'}</strong> (Road & Transport Dept). You can update issue statuses and record resolution details.
      </div>

      <div className="grid-stats">
        <StatCard title="Total Assigned" value={assignedIssues.length} icon="📋" />
        <StatCard title="Pending Action" value={pendingCount} icon="⏳" />
        <StatCard title="In Progress" value={progressCount} icon="🛠️" />
        <StatCard title="Resolved" value={resolvedCount} icon="✅" />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2>Assigned Work Orders</h2>
          <Link to="/resolver/issues" style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.9rem' }}>
            View Full Work List →
          </Link>
        </div>

        {assignedIssues.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎉</div>
            <h3>No assigned complaints right now</h3>
            <p>Check back later or contact Admin to get new tickets assigned to your department.</p>
          </div>
        ) : (
          <div className="grid-issues">
            {assignedIssues.map((issue) => (
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
    </div>
  );
}

export default ResolverDashboard;
