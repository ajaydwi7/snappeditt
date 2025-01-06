import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tabs-container">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab-button ${activeTab === index ? 'active' : ''}`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
