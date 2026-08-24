
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';

function IssueDetails({ issues }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = issues.find((i) => i.id === Number(id));

  if (!issue) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3>Issue Not Found</h3>
        <p>The complaint with ID #{id} could not be located in local state.</p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="primary" onClick={() => navigate('/citizen/issues')}>
            ← Back to My Issues
          </Button>
        </div>
      </div>
    );
  }

  const statuses = ['Pending', 'Assigned', 'In Progress', 'Resolved'];
  const currentStep = statuses.indexOf(issue.status);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>

      <div className="details-container">
        <div className="details-header">
          <div>
            <span className="category-pill" style={{ marginBottom: '0.5rem' }}>{issue.category}</span>
            <h1 style={{ fontSize: '1.6rem', marginTop: '0.2rem' }}>{issue.title}</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Complaint Reference Ticket: #{issue.id}</p>
          </div>
          <StatusBadge status={issue.status} />
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748b', marginBottom: '1rem' }}>
            Resolution Status Tracker
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {statuses.map((step, index) => {
              const isCompleted = index <= currentStep;
              return (
                <div key={step} style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? '#2563eb' : '#cbd5e1',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.4rem',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: isCompleted ? 700 : 400, color: isCompleted ? '#0f172a' : '#94a3b8' }}>
                    {step}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <label>Location</label>
            <p>📍 {issue.location}</p>
          </div>
          <div className="detail-item">
            <label>Date Reported</label>
            <p>📅 {issue.date}</p>
          </div>
          <div className="detail-item">
            <label>Reported By</label>
            <p>👤 {issue.reportedBy}</p>
          </div>
          <div className="detail-item">
            <label>Assigned Resolver</label>
            <p>🛠️ {issue.assignedTo || 'Unassigned (Awaiting Department Admin)'}</p>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
            Detailed Problem Description
          </label>
          <p style={{ background: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#334155' }}>
            {issue.description}
          </p>
        </div>

        {issue.resolutionNote && (
          <div style={{ marginTop: '1.5rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem', borderRadius: '8px' }}>
            <h4 style={{ color: '#166534', marginBottom: '0.4rem' }}>🔧 Resolution Information / Technician Notes:</h4>
            <p style={{ color: '#15803d' }}>{issue.resolutionNote}</p>
          </div>
        )}

        {issue.imageUrl && (
          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
              Attached Media Proof
            </label>
            <img 
              src={issue.imageUrl} 
              alt="Issue Proof" 
              style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default IssueDetails;
