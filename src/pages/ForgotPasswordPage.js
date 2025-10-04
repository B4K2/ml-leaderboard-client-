import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassSurface from '../components/GlassSurface';
import './ForgotPasswordPage.css';
import './LoginPage.css'; // Reusing styles
import { FaEnvelope } from 'react-icons/fa';
import authService from '../services/authService';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      await authService.requestPasswordReset({ email });
      setSuccessMessage('If an account with that email exists, a password reset link has been sent.');
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="centered-page">
      <GlassSurface width={400} height="auto" borderRadius={24}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          
          {!successMessage ? (
            <>
              <p style={{ textAlign: 'center', color: '#ccc' }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              {error && <p className="error-message" style={{textAlign: 'center'}}>{error}</p>}
              
              <div className="input-wrapper" style={{ paddingBottom: '0' }}>
                <div className="input-field-container">
                  <FaEnvelope className="input-icon" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input-field"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </>
          ) : (
            <p className="success-message">{successMessage}</p>
          )}

          <div className="register-link">
            Remember your password? <Link to="/login">Login</Link>
          </div>
        </form>
      </GlassSurface>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;