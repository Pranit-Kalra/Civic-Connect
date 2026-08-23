import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';

function ResolverIssueDetails({ issues, onUpdateStatus }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = issues.find(i => i.id === Number(id));

  const [status, setStatus] = useState(issue ? issue.status : 'In Progress');
  const [resolutionNote, setResolutionNote] = useState(issue ? (issue.resolutionNote || '') : '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!issue) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3>Ticket Not Found</h3>
        <Button variant="primary" onClick={() => navigate('/resolver/issues')}>
          ← Back to Assigned Issues
        </Button>
      </div>
    );
  }

  const handleStatusSubmit = (e) => {
    e.preventDefault();

    onUpdateStatus(issue.id, status, resolutionNote);
    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Button variant="outline" size="sm" onClick={() => navigate('/resolver/issues')}>
          ← Back to Assigned Tickets
        </Button>
      </div>

      <div className="details-container">
        <div className="details-header">
          <div>
            <span className="category-pill">{issue.category}</span>
            <h1 style={{ fontSize: '1.6rem', marginTop: '0.2rem' }}>{issue.title}</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Work Order ID: #{issue.id}</p>
          </div>
          <StatusBadge status={issue.status} />
        </div>

        {savedSuccess && (
          <div className="alert-banner" style={{ backgroundColor: '#d1fae5', borderColor: '#10b981', color: '#065f46' }}>
            ✅ Ticket status and resolution notes successfully updated!
          </div>
        )}

        <div className="details-grid">
          <div className="detail-item">
            <label>Location / Spot</label>
            <p>📍 {issue.location}</p>
          </div>
          <div className="detail-item">
            <label>Citizen Reporter</label>
            <p>👤 {issue.reportedBy}</p>
          </div>
          <div className="detail-item">
            <label>Reported On</label>
            <p>📅 {issue.date}</p>
          </div>
          <div className="detail-item">
            <label>Assigned Staff</label>
            <p>🛠️ {issue.assignedTo || 'Unassigned'}</p>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
            Problem Description
          </label>
          <p style={{ background: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            {issue.description}
          </p>
        </div>

        <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🔧 Update Issue Status & Resolution Notes</h3>

          <form onSubmit={handleStatusSubmit}>
            <div className="form-group">
              <label htmlFor="resolver-status">Change Complaint Status:</label>
              <select
                id="resolver-status"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="res-note">Work Summary / Resolution Notes:</label>
              <textarea
                id="res-note"
                className="form-control"
                placeholder="Describe actions taken (e.g., 'Replaced broken bulb and inspected electrical wiring')."
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                required={status === 'Resolved'}
              />
            </div>

            <Button type="submit" variant="primary">
              💾 Save & Update Status
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResolverIssueDetails;
