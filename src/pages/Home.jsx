
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Home({ currentUser }) {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

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

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I report a civic issue on CivicConnect?",
      answer: "Simply click 'Report an Issue', upload a picture of the problem, select your location and category (e.g. Roads, Garbage, Water), and submit. It takes less than 2 minutes!"
    },
    {
      question: "Who works on resolving the issues I report?",
      answer: "Your ticket is instantly reviewed by municipal administrators and assigned directly to the field technician or department resolver responsible for your ward."
    },
    {
      question: "Can I track the status of my reported complaint?",
      answer: "Yes! You get real-time status updates (Pending → Assigned → In Progress → Resolved) right on your Citizen Dashboard."
    },
    {
      question: "Is CivicConnect free to use for citizens?",
      answer: "100% free! CivicConnect is built to make public municipal governance transparent, efficient, and accessible to every community member."
    }
  ];

  return (
    <div>
      <section className="hero">
        <div className="hero-badge-pill">
          ✨ Over 1,200+ Civic Issues Resolved This Month
        </div>

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

        <div className="hero-stats-row">
          <div className="hero-stat-box">
            <div className="h-stat-number">98%</div>
            <div className="h-stat-label">Resolution Rate</div>
          </div>
          <div className="hero-stat-box">
            <div className="h-stat-number">&lt; 24h</div>
            <div className="h-stat-label">Avg. Response Time</div>
          </div>
          <div className="hero-stat-box">
            <div className="h-stat-number">15k+</div>
            <div className="h-stat-label">Issues Resolved</div>
          </div>
          <div className="hero-stat-box">
            <div className="h-stat-number">50+</div>
            <div className="h-stat-label">Municipal Wards</div>
          </div>
        </div>
      </section>

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

      <section id="about" className="about-us-section">
        <div className="about-us-container">
          <h2 className="about-title">About CivicConnect</h2>
          <p className="about-subtitle">
            CivicConnect is a modern community engagement platform designed to empower citizens and bridge the communication gap with municipal authorities for a cleaner, safer, and better-managed neighborhood.
          </p>

          <div className="about-cards-grid">
            <div className="about-card">
              <div className="about-card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide a transparent, efficient, and direct channel for citizens to report local infrastructure issues and hold civic bodies accountable.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>
                Fostering smart, responsive communities where technology drives rapid grievance resolution and continuous civic improvements.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-icon">🤝</div>
              <h3>Empowering Citizens</h3>
              <p>
                From potholes to streetlights, every reported issue helps city managers prioritize repairs, allocate resources effectively, and keep public spaces safe.
              </p>
            </div>
          </div>

          <div className="about-stats-banner">
            <div className="about-stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Transparent Tracking</div>
            </div>
            <div className="about-stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Civic Access</div>
            </div>
            <div className="about-stat-item">
              <div className="stat-number">4-Step</div>
              <div className="stat-label">Rapid Resolution</div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section" style={{ padding: '0' }}>
          <h2 className="section-title">Community Feedback</h2>
          <p className="section-subtitle">See how citizens & technicians are making a real difference together.</p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating-stars">★★★★★</div>
              <p className="testimonial-text">
                "Reported an overflowing garbage dump in my street. Within 24 hours, the municipal team cleared it and marked it resolved with photo proof!"
              </p>
              <div className="testimonial-user">
                <div className="user-avatar">R</div>
                <div className="user-details">
                  <h4>Rohan Mehta</h4>
                  <span>Verified Citizen</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating-stars">★★★★★</div>
              <p className="testimonial-text">
                "CivicConnect makes my job as a field technician so much easier. I get assigned clear tickets with exact locations and issue details."
              </p>
              <div className="testimonial-user">
                <div className="user-avatar">S</div>
                <div className="user-details">
                  <h4>Suresh Kumar</h4>
                  <span>Electrical Department Resolver</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating-stars">★★★★★</div>
              <p className="testimonial-text">
                "A broken streetlight near our local school was fixed right away. Complete transparency from pending to resolved status!"
              </p>
              <div className="testimonial-user">
                <div className="user-avatar">P</div>
                <div className="user-details">
                  <h4>Priya Sharma</h4>
                  <span>Resident Association Officer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know about CivicConnect.</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? 'active' : ''}`}
            >
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <span className="faq-toggle-icon">{activeFaq === index ? '−' : '+'}</span>
              </button>
              {activeFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="creators" className="creators-section">
        <h2 className="section-title">Project Creators</h2>
        <p className="section-subtitle">Meet the team behind the CivicConnect platform modules.</p>

        <div className="creators-grid">
          <div className="creator-card-box">
            <div className="creator-avatar-circle creator-avatar-citizen">P</div>
            <h3 className="creator-name">Pranit</h3>
            <span className="creator-module-tag tag-citizen">👤 Citizen Module</span>
            <p className="creator-desc">
              Created & developed the Citizen Portal, issue registration workflow, and local grievance reporting system.
            </p>
          </div>

          <div className="creator-card-box">
            <div className="creator-avatar-circle creator-avatar-admin">V</div>
            <h3 className="creator-name">Vansh</h3>
            <span className="creator-module-tag tag-admin">🛡️ Admin Module</span>
            <p className="creator-desc">
              Created & developed the Admin Dashboard, ticket assignment router, and municipal oversight management.
            </p>
          </div>

          <div className="creator-card-box">
            <div className="creator-avatar-circle creator-avatar-resolver">H</div>
            <h3 className="creator-name">Harjot</h3>
            <span className="creator-module-tag tag-resolver">🛠️ Resolver Module</span>
            <p className="creator-desc">
              Created & developed the Department Resolver Portal, technician task management, and live resolution tracking.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 CivicConnect Platform. Built for transparent, empowered communities.</p>
      </footer>
    </div>
  );
}

export default Home;