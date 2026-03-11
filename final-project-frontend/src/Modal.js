import React, { useState } from 'react';

function Modal({ isOpen, onClose, onLoginSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true); // Toggles between Login and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLoginView ? '/api/login' : '/api/signup';
    const payload = isLoginView ? { email, password } : { name, email, password };

    fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        alert(data.message || "Action failed! Check your credentials.");
      }
    })
    .catch(err => console.error("Auth error:", err));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isLoginView ? 'Login to Paws in SKG' : 'Create an Account'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <input 
              type="text" placeholder="Full Name" 
              value={name} onChange={(e) => setName(e.target.value)} required 
            />
          )}
          <input 
            type="email" placeholder="Email" 
            value={email} onChange={(e) => setEmail(e.target.value)} required 
          />
          <input 
            type="password" placeholder="Password" 
            value={password} onChange={(e) => setPassword(e.target.value)} required 
          />
          <button type="submit" className="login-submit-btn">
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          {isLoginView ? "Don't have an account?" : "Already have an account?"} 
          <span 
            onClick={() => setIsLoginView(!isLoginView)} 
            style={{ color: '#007bff', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}
          >
            {isLoginView ? 'Sign Up here' : 'Login here'}
          </span>
        </p>
        
        <button onClick={onClose} className="close-modal-btn">Cancel</button>
      </div>
    </div>
  );
}

export default Modal;