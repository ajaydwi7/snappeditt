import React, { useEffect, useRef } from 'react';
import './OurValues.css';
import ourValuesImage from "@/assets/images/our-values.webp";
import AccountibilityIcon from "@/assets/images/icons/Accountibility.svg";
import QualityIcon from "@/assets/images/icons/quality-5.svg";
import CommitmentIcon from "@/assets/images/icons/commitment.svg";
import AdaptibilitytIcon from "@/assets/images/icons/Adaptibility.svg";

const OurValues = () => {
  const underlineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (underlineRef.current) {
        const newWidth = Math.min(50 + scrollPosition / 10, 350); // Adjust size based on scroll
        underlineRef.current.style.width = `${newWidth}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="our-values-container">
      <div className="our-values-image">
        <img src={ourValuesImage} alt="Our Values" />
      </div>
      <div className="our-values-content">
        <h2 className="our-values-title">
          Our Values
          <span ref={underlineRef} className="our-underline"></span>
        </h2>
        <div className="our-values-grid">
          <div className="our-value-item">
            <img src={QualityIcon} alt="Quality Icon" className="our-value-icon" />
            <div className="our-value-details">
              <h3>Quality</h3>
              <p>What we do, we do well</p>
            </div>
          </div>
          <div className="our-value-item">
            <img src={CommitmentIcon} alt="Commitment Icon" className="our-value-icon" />
            <div className="our-value-details">
              <h3>Commitment</h3>
              <p>Committed in heart and mind</p>
            </div>
          </div>
          <div className="our-value-item">
            <img src={AccountibilityIcon} alt="Accountibility Icon" className="our-value-icon" />
            <div className="our-value-details">
              <h3>Accountability</h3>
              <p>If it is to be, it’s up to us</p>
            </div>
          </div>
          <div className="our-value-item">
            <img src={AdaptibilitytIcon} alt="Trust Icon" className="our-value-icon" />
            <div className="our-value-details">
              <h3>Adaptability</h3>
              <p>Always learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
