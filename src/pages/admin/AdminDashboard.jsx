import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';

function AdminDashboard({ issues, resolvers, users, departments }) {
  const navigate = useNavigate();

  const totalIssues = issues.length;
  const pendingCount = issues.filter(i => i.status === 'Pending').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved').length;
  const activeResolversCount = resolvers.length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Control Dashboard ⚙️</h1>
          <p className="page-subtitle">Platform Overview & Municipal Dispatch Operations.</p>
        </div>
      </div>

      <div className="alert-banner" style={{ backgroundColor: '#fef3c7', borderColor: '#f59e0b', color: '#92400e' }}>
        👑 <strong>Admin Role:</strong> Full system access to assign tickets, reassign department resolvers, manage registered citizens, and inspect municipal analytics.
      </div>

      <div className="grid-stats">
        <StatCard title="Total Citizens" value={users.filter(u => u.role === 'citizen').length} icon="👥" />
        <StatCard title="Total Complaints" value={totalIssues} icon="📑" />
        <StatCard title="Pending Review" value={pendingCount} icon="⏳" />
        <StatCard title="Resolved Issues" value={resolvedCount} icon="✅" />
        <StatCard title="Active Resolvers" value={activeResolversCount} icon="🛠️" />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Recent Grievance Submissions</h2>
          <Link to="/admin/issues" style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.9rem' }}>
            Manage All Issues ({issues.length}) →
          </Link>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Issue Title</th>
                <th>Citizen</th>
                <th>Category</th>
                <th>Assigned Resolver</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {issues.slice(0, 5).map((issue) => (
                <tr key={issue.id}>
                  <td><strong>#{issue.id}</strong></td>
                  <td><strong>{issue.title}</strong></td>
                  <td>👤 {issue.reportedBy}</td>
                  <td><span className="category-pill">{issue.category}</span></td>
                  <td>🛠️ {issue.assignedTo || <span style={{ color: '#dc2626' }}>Unassigned</span>}</td>
                  <td><StatusBadge status={issue.status} /></td>
                  <td>{issue.date}</td>
                  <td>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate('/admin/issues')}
                    >
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
