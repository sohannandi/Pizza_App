import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', formData);
      onLogin(response.data.user, response.data.token);
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>○ ENTER SQUID CRUST</h2>
        {error && <div className="error-message">⚠️ {error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">CUSTOMER ID (Email):</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your customer identification..."
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">SECURITY CODE:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your secret access code..."
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? '○ Accessing Squid Crust...' : '○ SIGN IN'}
          </button>
        </form>
        
        <p className="auth-link">
          NO ACCOUNT? <Link to="/register">△ JOIN SQUID CRUST</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;