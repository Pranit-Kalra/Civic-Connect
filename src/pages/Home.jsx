
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Home({ currentUser }) {
  const navigate = useNavigate();

  const handleReportClick = () => {
    if (currentUser) {
      navigate('/citizen/report');
    } else {
      navigate('/login');
    }
  };

  const handleGetStartedClick = () => {
    if (currentUser) {
      navigate(`/${currentUser.role}/dashboard`);
    } else {
      navigate('/register');
    }
  };

  return (
    <div>
      {}
      <section className="hero">
        <h1>Report. Track. Resolve.</h1>
        <p>
          Connect citizens with local municipal authorities responsible for making our communities cleaner, safer, and better for everyone.
        </p>
        <div className="hero-cta">
          <Button variant="primary" onClick={handleReportClick}>
            🚨 Report an Issue
          </Button>
          <Button variant="primary" style={{ color: 'white', borderColor: '#475569' }} onClick={handleGetStartedClick}>
            Get Started →
          </Button>
        </div>
      </section>

      {}
      <section id="how-it-works" className="section">
        <h2 className="section-title">How CivicConnect Works</h2>
        <p className="section-subtitle">A transparent 4-step workflow to resolve community grievances fast.</p>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Report Issue</h3>
            <p>Snap a photo, add a location, and describe the civic problem in under 2 minutes.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Automated Assignment</h3>
            <p>Admin routes the ticket directly to the assigned department worker or resolver.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>On-Ground Resolution</h3>
            <p>Department technicians repair the problem and update status in real-time.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Track Progress</h3>
            <p>Receive status notifications as your complaint moves from Pending to Resolved.</p>
          </div>
        </div>
      </section>

      {}
      <section id="categories" className="section" style={{ backgroundColor: '#ffffff', borderRadius: '16px', margin: '2rem auto' }}>
        <h2 className="section-title">Issue Categories</h2>
        <p className="section-subtitle">We help manage and resolve problems across multiple departments.</p>

        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">🛣️</div>
            <h3>Roads & Potholes</h3>
            <p>Damaged asphalt, dangerous potholes, uneven lanes.</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🗑️</div>
            <h3>Garbage & Waste</h3>
            <p>Overflowing bins, uncollected waste, illegal dumping.</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🚰</div>
            <h3>Water Supply</h3>
            <p>Pipe leaks, low pressure, contaminated water.</p>
          </div>
          <div className="category-card">
            <div className="category-icon">💡</div>
            <h3>Electricity</h3>
            <p>Broken streetlights, faulty transformers, loose wires.</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🧹</div>
            <h3>Sanitation</h3>
            <p>Sewage overflow, blocked gutters, public hygiene.</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🌳</div>
            <h3>Public Property</h3>
            <p>Broken park benches, damaged fencing, vandalism.</p>
          </div>
        </div>
      </section>

      {}
      <footer className="footer">
        <p>© 2026 CivicConnect Platform. Built for transparent, empowered communities.</p>
      </footer>
    </div>
  );
}

export default Home;