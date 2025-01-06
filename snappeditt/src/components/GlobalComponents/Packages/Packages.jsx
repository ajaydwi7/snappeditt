import React, { useState } from "react";
import Tabs from "@/components/GlobalComponents/Tabs/Tabs";
import ImageComparisonSlider from "@/components/GlobalComponents/ImageComparisonSlider/ImageComparisonSlider";
import RightSideCard from "@/components/GlobalComponents/RightSideCard/RightSideCard";
import "./Packages.css";

const Packages = ({ tabNames, tabsContent, title }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Safely access current content
  const currentContent = tabsContent?.[activeTab];

  // Safely handle images array
  const images = currentContent?.images || [];

  // Reset slide when active tab changes
  React.useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="main-container">
      <h3 className="packages-title">{title}</h3>

      {/* Tabs */}
      <Tabs tabs={tabNames} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="content-wrapper">
        {/* Carousel Section */}
        <div className="carousel">
          <div className="carousel-slide">
            {/* Safely render ImageComparisonSlider */}
            {images.length > 0 && images[currentSlide]?.length === 2 ? (
              <ImageComparisonSlider
                beforeImage={images[currentSlide][0]}
                afterImage={images[currentSlide][1]}
              />
            ) : (
              <p>No images available</p> // Fallback if no images exist
            )}
          </div>

          {/* Dot Indicators */}
          <div className="dots bottom-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => changeSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Side Card */}
        {currentContent && (
          <div className="right-side-card-wrapper">
            <RightSideCard
              title={currentContent.title}
              description={currentContent.description}
              price={currentContent.price}
              features={currentContent.features}
              addToCartBtn={currentContent.addToCartBtn}
              moreBtn={currentContent.moreBtn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
