import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import StaggeredMenu from '../StaggeredMenu'; // Adjust path if needed

// Define the menu items that are specific to the dashboard/protected area
const menuItems = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Tasks', link: '/tasks' },
  { label: 'My Submissions', link: '/submissions' },
  { label: 'Logout', link: '/logout' }, 
];
        
const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

const DashboardLayout = () => {
  return (
    // This container holds both the menu and the page content
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#000" // Changed for better visibility on a white panel
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl="/path-to-your-logo.svg"
        accentColor="#ff6b6b"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />

      {/* This is the content area for the specific page */}
      <main style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center'
      }}>
        {/* Outlet is a placeholder that renders the child route's element */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;