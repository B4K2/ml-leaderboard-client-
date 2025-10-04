import React from 'react';
import { useLocation } from 'react-router-dom';
import StaggeredMenu from '../StaggeredMenu'; // Adjust path if needed
import logoImage from '../../assets/logos/CCC.png';

// --- Define your menu items here ---
const menuItems = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Tasks', link: '/tasks' },
    { label: 'My Submissions', link: '/submissions' },
    { label: 'Logout', link: '/logout' },
];

const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/ccc_akgec/' },
    { label: 'GitHub', link: 'https://github.com/B4K2' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/akshat-balyan/' }
];

// --- List of paths where the menu should NOT appear ---
const noMenuPaths = [
  '/login',
  '/register',
  '/verify-otp',
  '/forgot-password',
  '/reset-password' // Covers the dynamic part too
];

const ConditionalMenu = () => {
  const location = useLocation();

  // Check if the current URL starts with any of the paths in our blocklist
  const showMenu = !noMenuPaths.some(path => location.pathname.startsWith(path));

  // If we are on a blocked path, render nothing.
  if (!showMenu) {
    return null;
  }

  // Otherwise, render the menu.
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#fff"
      openMenuButtonColor="#000"
      changeMenuColorOnOpen={true}
      colors={['#B19EEF', '#5227FF']}
      logoUrl={logoImage}
      accentColor="#ff6b6b"
      onMenuOpen={() => console.log('Menu opened')}
      onMenuClose={() => console.log('Menu closed')}
    />
  );
};

export default ConditionalMenu;