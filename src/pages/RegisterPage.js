import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import GlassSurface from '../components/GlassSurface';
import './RegisterPage.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './LoginPage.css';

// Import our new service
import authService from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.password2) {
        setError({ password: "Passwords do not match." });
        setLoading(false);
        return;
    }

    try {
      const response = await authService.register(formData);
      // On success, navigate to the OTP page
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      // The error object from axios is usually in err.response.data
      console.error('Registration failed:', err.response?.data);
      setError(err.response?.data || { message: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <GlassSurface width={400} height="auto" borderRadius={24}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Register</h2>

          {/* Display general errors */}
          {error?.message && <p style={{ color: 'red' }}>{error.message}</p>}

          <div className="input-wrapper">
            <div className="input-field-container">
                <FaUser className="input-icon" />
                <input name="username" type="text" placeholder="Username" className="input-field" onChange={handleChange} required />
                {error?.username && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error.username}</p>}
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-field-container">
                <FaEnvelope className="input-icon" />
                <input name="email" type="email" placeholder="Email" className="input-field" onChange={handleChange} required />
                {error?.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error.email}</p>}
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-field-container">
                <FaLock className="input-icon" />
                <input name="password" type="password" placeholder="Password" className="input-field" onChange={handleChange} required />
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-field-container">
                <FaLock className="input-icon" />
                <input name="password2" type="password" placeholder="Confirm Password" className="input-field" onChange={handleChange} required />
                {error?.password && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error.password}</p>}
            </div>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="register-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </GlassSurface>
    </div>
  );
};

export default RegisterPage;