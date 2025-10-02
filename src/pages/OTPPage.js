import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import GlassSurface from '../components/GlassSurface';
import './OTPPage.css';
import { FaKey } from 'react-icons/fa';
import './LoginPage.css';

// Import our auth service
import authService from '../services/authService';

const OTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access navigation state

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get the email from the navigation state when the component loads
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If someone navigates here directly without an email, redirect them
      console.error("No email provided for OTP verification.");
      navigate('/register');
    }
  }, [location, navigate]);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setOtp(value);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.verifyOtp({ email, otp });
      console.log('OTP verification successful:', response.data);
      
      // On success, navigate to the login page as planned
      navigate('/login');

    } catch (err) {
      console.error('OTP verification failed:', err.response?.data);
      const errorMessage = err.response?.data?.error || 'Verification failed. Please try again.';
      setError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-page-container">
      <GlassSurface width={400} height="auto" borderRadius={24}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Verify Your Email</h2>
          <p className="otp-info">
            An OTP has been sent to <strong>{email}</strong>. Please enter it below.
          </p>
          
          {error?.message && <p style={{ color: 'red', textAlign: 'center' }}>{error.message}</p>}

          <div className="input-wrapper">
            <FaKey className="input-icon" />
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              className="input-field"
              value={otp}
              onChange={handleOtpChange}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </GlassSurface>
    </div>
  );
};

export default OTPPage;