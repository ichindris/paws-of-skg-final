import React from 'react';
import './Navbar.css';

const Navbar = ({ setView, currentView, openModal, user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo" onClick={() => setView('home')}>
          <span className="logo-icon">🐾</span>
          <span className="logo-text">PAWS <span className="logo-subtext">IN SKG</span></span>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <button 
            className={`nav-item ${currentView === 'accommodations' ? 'active' : ''}`}
            onClick={() => setView('accommodations')}
          >
            Stay
          </button>
          
          {/* NEW TAB HERE */}
          <button 
            className={`nav-item ${currentView === 'going out' ? 'active' : ''}`}
            onClick={() => setView('going out')}
          >
            Going Out
          </button>

          <button 
            className={`nav-item ${currentView === 'map' ? 'active' : ''}`}
            onClick={() => setView('map')}
          >
            Explore
          </button>
        </div>

        {/* User / Login Section */}
        <div className="nav-actions">
          {user ? (
            <div className="user-profile">
              <span className="user-name">Hello, {user.name.split(' ')[0]}</span>
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <button className="login-trigger-btn" onClick={openModal}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;