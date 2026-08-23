import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';

function Register({ onLogin, onAddUser, users = [], resolvers = [] }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Rajpura');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();

    const userExists = users.some(u => u.email && u.email.trim().toLowerCase() === cleanEmail);
    const resolverExists = resolvers.some(r => r.email && r.email.trim().toLowerCase() === cleanEmail);
    const isAdmin = cleanEmail === 'admin@civicconnect.gov';

    if (userExists || resolverExists || isAdmin) {
      setErrorMessage(`An account with email "${email.trim()}" already exists! Please login instead.`);
      return;
    }

    if (phone.length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      password: password,
      role: 'citizen',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    if (onAddUser) {
      onAddUser(newUser);
    }

    setSuccessMessage(`Account created successfully for ${newUser.name}! Redirecting to dashboard...`);

    setTimeout(() => {
      onLogin(newUser);
      navigate('/citizen/dashboard');
    }, 600);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Create Citizen Account</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Join CivicConnect as a Citizen to report & track local civic issues
        </p>

        {errorMessage && (
          <div className="alert-banner" style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444', color: '#991b1b', marginBottom: '1.25rem' }}>
            ⚠️ {errorMessage}{' '}
            <Link to="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline', marginLeft: '0.25rem' }}>
              Go to Login →
            </Link>
          </div>
        )}

        {successMessage ? (
          <div className="alert-banner" style={{ backgroundColor: '#d1fae5', borderColor: '#10b981', color: '#065f46', textAlign: 'center' }}>
            ✅ {successMessage}
          </div>
        ) : (
          <div className="alert-banner" style={{ marginBottom: '1.25rem', fontSize: '0.82rem' }}>
            👤 Creating your account will register your profile (Name, Email, City) into the system and display your profile on the Citizen Dashboard & Admin directory.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-name">Full Name *</label>
            <input
              id="reg-name"
              type="text"
              className="form-control"
              placeholder="e.g. Vansh Maini"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email Address *</label>
            <input
              id="reg-email"
              type="email"
              className="form-control"
              placeholder="vanshmaini14@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-phone">Phone Number (10 digits) *</label>
            <input
              id="reg-phone"
              type="tel"
              className="form-control"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
              minLength={10}
              pattern="[0-9]{10}"
              title="Phone number must be exactly 10 digits"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-city">City / Location *</label>
            <input
              id="reg-city"
              type="text"
              className="form-control"
              placeholder="e.g. Rajpura"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-pass">Password *</label>
            <input
              id="reg-pass"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
            Register Citizen Account →
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Already registered? <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
