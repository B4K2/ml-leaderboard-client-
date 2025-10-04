import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams
import GlassSurface from '../components/GlassSurface';
import './LoginPage.css';
import { FaLock } from 'react-icons/fa';
import authService from '../services/authService';

const ResetPasswordPage = () => {
  const { uidb64, token } = useParams(); // Hook to read URL parameters
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({ password: '', password2: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.password2) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await authService.confirmPasswordReset(uidb64, token, passwords);
      setSuccessMessage('Your password has been reset successfully! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Wait 3 seconds before redirecting

    } catch (err) {
          const errorData = err.response?.data?.error;
          let errorMessage = 'An unknown error occurred.';

          if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (Array.isArray(errorData)) {
            errorMessage = errorData.join(' ');
          }
          setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="centered-page">
      <GlassSurface width={400} height="auto" borderRadius={24}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Set New Password</h2>
          
          {successMessage ? (
             <p className="success-message">{successMessage}</p>
          ) : (
            <>
              {error && <p className="error-message" style={{textAlign: 'center'}}>{error}</p>}
              
              <div className="input-wrapper">
                <div className="input-field-container">
                  <FaLock className="input-icon" />
                  <input name="password" type="password" placeholder="New Password" className="input-field" onChange={handleChange} required />
                </div>
              </div>
              <div className="input-wrapper" style={{ paddingBottom: '0' }}>
                <div className="input-field-container">
                  <FaLock className="input-icon" />
                  <input name="password2" type="password" placeholder="Confirm New Password" className="input-field" onChange={handleChange} required />
                </div>
              </div>
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </>
          )}
        </form>
      </GlassSurface>
      </div>
    </div>
  );
};

export default ResetPasswordPage;