import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassSurface from '../components/GlassSurface';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa'; // Correctly using FaUser

// Import our auth service
import authService from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '', // CORRECTED: Was 'email', now matches the input field
    password: '',
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

    try {
      // This will now correctly send { username: '...', password: '...' }
      const response = await authService.login(formData);
      console.log('Login successful:', response.data);

      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      
      navigate('/dashboard');

    } catch (err) {
      console.error('Login failed:', err.response?.data);
      const errorMessage = err.response?.data?.detail || 'Invalid credentials. Please try again.';
      setError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <GlassSurface width={400} height="auto" borderRadius={24}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error?.message && <p className="error-message" style={{ textAlign: 'center' }}>{error.message}</p>}

          <div className="input-wrapper">
            <div className="input-field-container">
              <FaUser className="input-icon" />
              <input
                name="identifier" // This name matches the state
                type="text"
                placeholder="Username or Email" 
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-field-container">
              <FaLock className="input-icon" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <div className="forgot-links">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>  
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </GlassSurface>
    </div>
  );
};

export default LoginPage;