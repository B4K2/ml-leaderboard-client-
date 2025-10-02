import api from './api';

const register = (userData) => {
  // userData will be an object like { username, email, password, password2 }
  return api.post('/accounts/register/', userData);
};

const verifyOtp = (otpData) => {
  // otpData will be an object like { email, otp }
  return api.post('/accounts/verify-otp/', otpData);
};

const login = (credentials) => {
  // credentials will be an object like { email, password }
  return api.post('/accounts/login/', credentials);
};

const requestPasswordReset = (emailData) => {
  // emailData will be { email: 'user@example.com' }
  return api.post('/accounts/password-reset/', emailData);
};

const confirmPasswordReset = (uid, token, passwordData) => {
  // passwordData will be { password, password2 }
  // The URL is dynamic, including the uid and token
  return api.post(`/accounts/password-reset-confirm/${uid}/${token}/`, passwordData);
};

const getProfile = () => {
  return api.get('/accounts/profile/');
};

const authService = {
  register,
  verifyOtp,
  login,
  requestPasswordReset,
  confirmPasswordReset,
  getProfile,
};

export default authService;