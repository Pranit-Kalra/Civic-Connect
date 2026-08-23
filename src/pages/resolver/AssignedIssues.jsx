import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';

function AssignedIssues({ issues, currentUser, onUpdateStatus }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  const assigned = currentUser
    ? issues.filter(i => i.assignedTo === currentUser.name || i.resolverId === currentUser.id)
    : issues.filter(i => i.assignedTo !== null);

  const displayed = filterStatus === 'All'
    ? assigned
    : assigned.filter(i => i.status === filterStatus);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Assigned Tickets List</h1>
          <p className="page-subtitle">Review, manage, and update resolution statuses for assigned complaints.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {['All', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
          <button
            key={st}
            className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus(st)}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticket Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Reported Date</th>
              <th>Quick Action</th>
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  No complaints found for status filter "{filterStatus}".
                </td>
              </tr>
            ) : (
              displayed.map((issue) => (
                <tr key={issue.id}>
                  <td><strong>#{issue.id}</strong></td>
                  <td>
                    <strong>{issue.title}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>By: {issue.reportedBy}</div>
                  </td>
                  <td><span className="category-pill">{issue.category}</span></td>
                  <td>📍 {issue.location}</td>
                  <td><StatusBadge status={issue.status} /></td>
                  <td>📅 {issue.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/resolver/issues/${issue.id}`)}
                      >
                        Manage & Update →
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignedIssues;
