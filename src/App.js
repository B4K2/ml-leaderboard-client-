import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Silk from './components/Silk';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import OTPPage from './pages/OTPPage';         // Import OTPPage
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="aurora-background">
        <Silk
          speed={9}
          scale={1.5}
          color="#222222"
          noiseIntensity={1.2}
        />
      </div>
      <div className="content">
        <Routes> {/* Use Routes to define page navigation */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<OTPPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordPage />} />
          {/* Default route */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;