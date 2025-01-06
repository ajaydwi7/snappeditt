import React from "react";
import "./HeroSection.css"; // Import the CSS for styling

const HeroSection = ({ title, subtitle, description, buttonText, backgroundImage }) => {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Dynamic background image
    >
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <h2 className="hero-subtitle">{subtitle}</h2>
        <p className="hero-description">{description}</p>
        <button className="hero-button">{buttonText}</button>
      </div>
    </section>
  );
};

export default HeroSection;
