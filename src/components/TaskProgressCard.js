import React from 'react';
import GlassSurface from './GlassSurface';
import './TaskProgressCard.css';

const TaskProgressCard = ({ stats, loading }) => {
  return (
    <GlassSurface borderRadius={24} width="100%" height="auto">
      <div className="task-progress-card">
        <h3>Current Task Progress</h3>
        <div className="stats-grid">
          {loading ? (
            <p>Loading stats...</p>
          ) : (
            <>
              <div className="stat-item">
                <div className="value">{stats?.total_submissions ?? 0}</div>
                <div className="label">Submissions</div>
              </div>
              <div className="stat-item">
                <div className="value">{stats?.best_rank ?? 'N/A'}</div>
                <div className="label">Best Rank</div>
              </div>
              <div className="stat-item">
                <div className="value">{stats?.current_rank ?? 'N/A'}</div>
                <div className="label">Current Rank</div>
              </div>
            </>
          )}
        </div>
      </div>
    </GlassSurface>
  );
};

export default TaskProgressCard;