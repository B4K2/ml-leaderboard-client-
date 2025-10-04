import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Silk from './components/Silk';
import ProtectedRoute from './components/ProtectedRoute';
import ConditionalMenu from './components/layout/ConditionalMenu'; // <-- Import the new component

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OTPPage from './pages/OTPPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="aurora-background">
        <Silk speed={9} scale={1.5} color="#222222" noiseIntensity={1.2} />
      </div>

      {/* RENDER THE MENU HERE, AS A SIBLING TO .content */}
      <div className="sticky-menu-container">
        <ConditionalMenu />
      </div>

      <div className="content">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<OTPPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordPage />} />

          {/* --- Protected Route for the Dashboard --- */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* --- Default Route --- */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Fallback for any other unknown route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;