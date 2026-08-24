import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { verifyPassword, verifyResolverPassword } from '../data/mockData';

function Login({ onLogin, initialUsers = [], resolvers = [] }) {
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'citizen') {
      setEmail('');
      setPassword('');
    }
    if (role === 'resolver') {
      setEmail('rahul.sharma@civicconnect.gov');
      setPassword('resolver123');
    }
    if (role === 'admin') {
      setEmail('admin@civicconnect.gov');
      setPassword('admin123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    let verification;
    if (selectedRole === 'resolver') {
      verification = verifyResolverPassword(email, password, resolvers);
    } else {
      verification = verifyPassword(email, password, resolvers, initialUsers);
    }

    if (!verification.success) {
      setErrorMessage(verification.message);
      return;
    }

    const foundUser = verification.user;

    onLogin(foundUser);
    navigate(`/${foundUser.role}/dashboard`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '480px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Sign in to access your CivicConnect portal profile
        </p>

        {errorMessage && (
          <div className="alert-banner" style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444', color: '#991b1b', marginBottom: '1.25rem' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Role / Portal Section:</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${selectedRole === 'citizen' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('citizen')}
              >
                👤 Citizen
              </button>
              <button
                type="button"
                className={`role-btn ${selectedRole === 'resolver' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('resolver')}
              >
                🛠️ Resolver
              </button>
              <button
                type="button"
                className={`role-btn ${selectedRole === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('admin')}
              >
                ⚙️ Admin
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              required
            />
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
            💡 <strong>System Accounts & Passwords:</strong><br />
            • <strong>Citizen:</strong> No default citizen accounts. <Link to="/register" style={{ color: '#2563eb', fontWeight: 600 }}>Create a new account</Link> to log in.<br />
            • <strong>Resolvers:</strong> <code>rahul.sharma@civicconnect.gov</code> / Password: <code>resolver123</code><br />
            • <strong>Admin:</strong> <code>admin@civicconnect.gov</code> / Password: <code>admin123</code>
          </div>

          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Login to Dashboard →
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Need a citizen account? <Link to="/register" style={{ color: '#2563eb', fontWeight: 600 }}>Create an Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
