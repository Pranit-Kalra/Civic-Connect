import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

function Navbar({ currentUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🏛️ Civic<span>Connect</span>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#how-it-works">How It Works</a>
        </li>
        <li>
          <a href="#categories">Categories</a>
        </li>

        {currentUser ? (
          <>
            <li>
              <Link to={`/${currentUser.role}/dashboard`}>
                Dashboard
              </Link>
            </li>
            <li>
              <div className="user-pill">
                <span>👤 <strong>{currentUser.name}</strong></span>
                <span className="role-tag">{currentUser.role}</span>
              </div>
            </li>
            <li>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
