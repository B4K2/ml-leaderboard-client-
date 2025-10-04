import React from 'react';
import GlassSurface from './GlassSurface';

const PlaceholderCard = ({ title }) => {
  return (
    <GlassSurface borderRadius={24} width="100%" height="100%">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#ccc',
        fontSize: '2rem',
        fontStyle: 'italic'
      }}>
        {title}
      </div>
    </GlassSurface>
  );
};

export default PlaceholderCard;