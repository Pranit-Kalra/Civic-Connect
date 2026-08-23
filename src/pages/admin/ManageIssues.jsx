
import React, { useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';

function ManageIssues({ issues, resolvers, onAssignResolver, onUpdateStatus }) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredIssues = issues.filter((issue) => {
    const categoryMatch = filterCategory === 'All' || issue.category === filterCategory;
    const statusMatch = filterStatus === 'All' || issue.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const handleResolverChange = (issueId, resolverName) => {
    const selectedResolver = resolvers.find(r => r.name === resolverName);
    onAssignResolver(issueId, selectedResolver ? selectedResolver.name : null, selectedResolver ? selectedResolver.id : null);
  };

  const handleStatusChange = (issueId, newStatus) => {
    onUpdateStatus(issueId, newStatus);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage All Complaints</h1>
          <p className="page-subtitle">Assign resolvers, update statuses, and oversee ticket resolution.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>Category Filter:</label>
          <select
            className="form-control"
            style={{ width: '180px', padding: '0.4rem 0.8rem' }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Road">Road</option>
            <option value="Garbage">Garbage</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Public Property">Public Property</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>Status Filter:</label>
          <select
            className="form-control"
            style={{ width: '180px', padding: '0.4rem 0.8rem' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue Title</th>
              <th>Category</th>
              <th>Reported By</th>
              <th>Assigned Resolver</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  No issues match the selected filters.
                </td>
              </tr>
            ) : (
              filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  <td><strong>#{issue.id}</strong></td>
                  <td>
                    <strong>{issue.title}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>📍 {issue.location}</div>
                  </td>
                  <td><span className="category-pill">{issue.category}</span></td>
                  <td>👤 {issue.reportedBy}</td>
                  <td>
                    
                    <select
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.3rem' }}
                      value={issue.assignedTo || ''}
                      onChange={(e) => handleResolverChange(issue.id, e.target.value)}
                    >
                      <option value="">-- Select Resolver --</option>
                      {resolvers.map((res) => (
                        <option key={res.id} value={res.name}>
                          {res.name} ({res.department})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    
                    <select
                      className="form-control"
                      style={{ fontSize: '0.85rem', padding: '0.3rem' }}
                      value={issue.status}
                      onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td>
                    <StatusBadge status={issue.status} />
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

export default ManageIssues;
