import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import TextType from '../components/TextType'; // Import our new component

const DashboardPage = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUsername(response.data.username);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        // Here you might handle token expiration and redirect to login
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div style={{ color: 'white', fontSize: '2rem' }}>Loading...</div>;
  }

  return (
    <div>
      <TextType
        as="h1" // Render as an h1 tag
        text={[`Welcome back, ${username}!`]}
        typingSpeed={75}
        loop={false} // We only want it to type once
        className="welcome-message"
        style={{ fontSize: '3rem', fontWeight: '600' }}
      />
      {/* We will add the other dashboard widgets here later */}
    </div>
  );
};

export default DashboardPage;