import React from 'react';
import './TimelineSection.css';
import DownArrow from '@/assets/images/icons/down-arrow.svg';
import User from '@/assets/images/icons/add-friend.svg';
import SelectService from '@/assets/images/icons/package.svg';
import Relax from '@/assets/images/icons/relax.svg';
import Upload from '@/assets/images/icons/upload.svg';
import Download from '@/assets/images/icons/customer-feedback.svg';

const TimelineSection = () => {
  const timelineData = [
    {
      icon: User,
      title: 'CREATE YOUR FREE ACCOUNT',
      description: 'Create your account or schedule a kick-off call with our onboarding team to setup a tailored profile and work with an assigned editor.',
    },
    {
      icon: SelectService,
      title: 'SELECT SERVICES',
      description: 'Choose the appropriate services as per your needs...',
    },
    {
      icon: Upload,
      title: 'UPLOAD FILES',
      description: 'Upload your files.',
    },
    {
      icon: Relax,
      title: 'RELAX',
      description: 'Watch some movies, or spend time with...',
    },
    {
      icon: Download,
      title: 'DOWNLOAD & GIVE FEEDBACK',
      description: 'Download files and tell us how to improve the results moving forward. if corrections are needed, they will handled within 24hrs, often faster!',
    },
  ];

  return (
    <div className="timeline-container">
      <div className="left-content">
        <h2>It All Starts With.....</h2>
      </div>
      <div className="right-content">
        <ul className="timeline">
          {timelineData.map((item, index) => (
            <li key={index} className="timeline-row">
              <div className="timeline-icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <div className="timeline-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              {index !== timelineData.length + 1 && (
                <div className="timeline-arrow">
                  <img src={DownArrow} alt="Down Arrow" />
                </div>
              )}
            </li>
          ))}
        </ul>
        <button className="btn-primary">GET STARTED WITH YOUR FIRST ORDER</button>
      </div>
    </div>
  );
};

export default TimelineSection;
