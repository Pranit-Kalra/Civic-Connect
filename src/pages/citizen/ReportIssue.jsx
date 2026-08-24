
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

function ReportIssue({ onAddIssue, currentUser }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Road');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIssue = {
      id: Date.now(),
      title: title,
      description: description,
      category: category,
      location: location,
      status: 'Pending',
      reportedBy: currentUser ? currentUser.name : 'Amit Kumar',
      citizenId: currentUser ? currentUser.id : 1,
      assignedTo: null,
      resolverId: null,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      resolutionNote: '',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1601027847350-0285867c31f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    };

    onAddIssue(newIssue);

    navigate('/citizen/issues');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Report a Civic Issue</h1>
          <p className="page-subtitle">Fill out the form below to report a problem in your neighborhood.</p>
        </div>
      </div>

      <div className="form-card">
        <div className="alert-banner" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          📌 <strong>State Demonstration:</strong> Submitting this form calls the <code>onAddIssue</code> function prop, adding the new complaint into React local state!
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Issue Title / Headline *</label>
            <input
              id="title"
              type="text"
              className="form-control"
              placeholder="e.g. Large open pothole near Main Gate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Road">Road & Potholes</option>
              <option value="Garbage">Garbage & Waste</option>
              <option value="Water">Water Leakage & Supply</option>
              <option value="Electricity">Electricity & Streetlights</option>
              <option value="Sanitation">Sanitation & Sewage</option>
              <option value="Public Property">Public Property Damage</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location / Address *</label>
            <input
              id="location"
              type="text"
              className="form-control"
              placeholder="e.g. Sector 4, Near Community Center"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description *</label>
            <textarea
              id="description"
              className="form-control"
              placeholder="Provide specific details about the issue to help technicians locate and resolve it..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Photo URL (Optional Mock Image)</label>
            <input
              id="imageUrl"
              type="url"
              className="form-control"
              placeholder="https://example.com/photo.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <small style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.2rem' }}>
              Leave blank to use default category thumbnail image.
            </small>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Button type="submit" variant="primary">
              🚀 Submit Issue Complaint
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/citizen/dashboard')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;
