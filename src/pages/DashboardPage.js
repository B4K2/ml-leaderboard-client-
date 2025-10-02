import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import TextType from '../components/TextType';

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
    // Add this wrapper div to center the content on the page
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
      <TextType
        as="h1"
        text={[`Welcome back, ${username}!`]}
        typingSpeed={75}
        loop={false}
        className="welcome-message"
        style={{ fontSize: '3rem', fontWeight: '600' }}
      />
    </div>
  );
};

export default DashboardPage;