import React from 'react';
import GlassSurface from './GlassSurface';
import './ProfileCard.css';

const ProfileCard = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <GlassSurface borderRadius={24} width="100%" height="auto">
      <div className="profile-card">
        {/* AVATAR on the left */}
        <div className="profile-avatar">{user.avatar_emoji || '👤'}</div>

        {/* INFO container on the right */}
        <div className="profile-info">
          <h2 className="profile-username">{user.username}</h2>
          <p className="profile-email">{user.email}</p>
          <div className="current-task">
            <p>No Task Selected.</p>
          </div>
        </div>
      </div>
    </GlassSurface>
  );
};

export default ProfileCard;