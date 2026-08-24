import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import IssueCard from '../../components/IssueCard';
import Button from '../../components/Button';

function CitizenDashboard({ issues, currentUser }) {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'C';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const citizenIssues = currentUser
    ? issues.filter(issue => issue.reportedBy === currentUser.name || issue.citizenId === currentUser.id)
    : issues;

  const totalCount = citizenIssues.length;
  const pendingCount = citizenIssues.filter(i => i.status === 'Pending').length;
  const progressCount = citizenIssues.filter(i => i.status === 'In Progress' || i.status === 'Assigned').length;
  const resolvedCount = citizenIssues.filter(i => i.status === 'Resolved').length;

  const handleViewDetails = (id) => {
    navigate(`/citizen/issues/${id}`);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Citizen Dashboard</h1>
          <p className="page-subtitle">Track your reported community issues and manage your profile.</p>
        </div>
        <Link to="/citizen/report">
          <Button variant="primary">➕ Report New Issue</Button>
        </Link>
      </div>

      {currentUser && (
        <div className="citizen-profile-card">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {getInitials(currentUser.name)}
            </div>
            <div className="profile-info">
              <h2>
                {currentUser.name}
                <span className="account-badge-pill">Verified Citizen</span>
              </h2>
              <p>👤 Registered Citizen Profile • CivicConnect Member</p>
            </div>
          </div>

          <div className="profile-meta-grid">
            <div className="profile-meta-item">
              <label>📧 Email Address</label>
              <strong>{currentUser.email || 'N/A'}</strong>
            </div>
            <div className="profile-meta-item">
              <label>📞 Phone Number</label>
              <strong>{currentUser.phone || 'N/A'}</strong>
            </div>
            <div className="profile-meta-item">
              <label>📍 City / Area</label>
              <strong>{currentUser.city || 'Rajpura'}</strong>
            </div>
            <div className="profile-meta-item">
              <label>📅 Member Since</label>
              <strong>{currentUser.joinedDate || 'Recently Joined'}</strong>
            </div>
          </div>
        </div>
      )}

      <div className="grid-stats">
        <StatCard title="My Reported Issues" value={totalCount} icon="📝" />
        <StatCard title="Pending Review" value={pendingCount} icon="⏳" />
        <StatCard title="In Resolution" value={progressCount} icon="🔄" />
        <StatCard title="Successfully Resolved" value={resolvedCount} icon="✅" />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2>Your Recent Submissions ({citizenIssues.length})</h2>
          <Link to="/citizen/issues" style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.9rem' }}>
            View All Submissions →
          </Link>
        </div>

        {citizenIssues.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No complaints reported yet by {currentUser ? currentUser.name : 'you'}</h3>
            <p>Have a pothole, streetlight failure, or garbage issue in your area?</p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/citizen/report">
                <Button variant="primary" size="sm">Report Your First Issue</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid-issues">
            {citizenIssues.slice(0, 3).map((issue) => (
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

export default CitizenDashboard;
