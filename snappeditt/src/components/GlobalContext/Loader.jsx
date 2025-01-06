import React, { useState, useEffect } from 'react';
import './Loader.css'; // Ensure this file contains your CSS

const LoadingScreen = ({ duration = 5000 }) => { // Default duration is 3000ms (3 seconds)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isLoading) {
    return null; // Return null to hide the loading screen
  }

  return (
    <div className="loop-wrapper">
      <div className="mountain"></div>
      <div className="hill"></div>
      <div className="tree"></div>
      <div className="tree"></div>
      <div className="tree"></div>
      <div className="rock"></div>
      <div className="truck"></div>
      <div className="wheels"></div>
    </div>
  );
};

export default LoadingScreen;
