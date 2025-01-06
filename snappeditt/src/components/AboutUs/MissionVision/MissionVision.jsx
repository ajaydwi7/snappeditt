import React from 'react';
import './MissionVision.css';

const MissionVision = ({ title, content, missionVisionImage }) => {
  return (
    <div className="mission-vision-container">
      <div className="mission-vision-image">
        <img src={missionVisionImage} alt="Mission and Vision" />
      </div>
      <div className="mission-vision-content">
        <h2 className="section-title">{title}</h2>
        <p className="section-text">{content}</p>
      </div>

    </div>
  );
};

export default MissionVision;
