import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import TextType from '../components/TextType';
import ProfileCard from '../components/ProfileCard';
import TaskProgressCard from '../components/TaskProgressCard';
import PlaceholderCard from '../components/PlaceholderCard'; // Import the placeholder
import ShinyText from '../components/ShinyText';
import './DashboardPage.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileResponse, statsResponse] = await Promise.all([
          authService.getProfile(),
          authService.getUserStats(),
        ]);
        setUser(profileResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading || !user) {
    return <div className="welcome-section" style={{ color: 'white' }}>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <section className="welcome-section">
        <TextType
          as="h1"
          // --- THIS IS THE FIX ---
          // Provide an array of messages to cycle through
          text={[
            `Welcome back, ${user.username}!`,
            "Ready for a new challenge?",
            "Let's check your progress."
          ]}
          // --- END OF FIX ---
          typingSpeed={75}
          pauseDuration={1500} // Pause between sentences
          loop={true} // Set to true to cycle indefinitely
          className="welcome-message"
        />
        <ShinyText 
          text="Scroll down to see your dashboard" 
          disabled={false} 
          speed={3} 
          className='custom-class' 
        />
      </section>

      <section className="dashboard-content">
        {/* --- The 2x2 Grid Layout --- */}
        <ProfileCard user={user} />
        <TaskProgressCard stats={stats} loading={loading} />
        <PlaceholderCard title="Graph Coming Soon" />
        <PlaceholderCard title="More Stats Coming Soon" />
      </section>
    </div>
  );
};

export default DashboardPage;