import React from 'react';
import './PageBanner.css';
import aboutImage from "@/assets/images/Edit-photo.gif";

const PageBanner = () => {
  return (
    <div className="agency-container">
      <div className="agency-content">
        <h1 className="agency-title">We Are <span className='spantext'>SNAPPEDITT</span></h1>
        <p className="agency-text">
          We are a professional post production company based in Mumbai, India. We offer cost effective post production solutions to all photographers and companies dealing into Real Estate, Wedding, Commercial, Portraits etc.
          <br />
          Our main aim is to help photographers to increase their productivity and reduce the burden of image editing by providing consistent quality and cost effective pricing.
          <br /><br />

          Currently we have 150+ professional editors working 24/7 around the clock to match the turnaround time expectations of our partners.
        </p>
        <button className="agency-button">Learn How Can We Help You ➔</button>
      </div>
      <div className="agency-image">
        <img src={aboutImage} alt="Digital Agency" />
      </div>
    </div>
  );
};

export default PageBanner;
