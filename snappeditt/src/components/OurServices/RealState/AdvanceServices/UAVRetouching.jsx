import React, { useState } from 'react';
import ImageComparisonSlider from '@/components/GlobalComponents/ImageComparisonSlider/ImageComparisonSlider';
import { Link } from 'react-router-dom';
import { CircleCheck, CircleX } from "lucide-react";

const UAVRetouching = () => {
  const service = {
    title: "UAV Retouching",
    price: "$1.50/Image",
    description: "With the help of our aerial photo editing services, we create appealing images that stand out from the competitors and clearly depicts all the information about the property. Use this at Real Estate home page",
    addToCartBtn: '/services/real-estate/uav-retouching',
    features: [
      { name: 'Wires & Cords Removal', included: true },
      { name: 'Photographers & Tripod Reflection Removal', included: true },
      { name: 'Agent Sign Board, Garbage Bin Removal', included: true },
      { name: 'Swimming Pool Hose Removal', included: true },
      { name: 'Furniture, other objects Removal', included: true },

    ],
    // Multiple sets of image pairs for the comparison slider
    images: [
      [
        new URL('@/assets/images/Day-to-Dusk-SHP-Raw-1.jpg', import.meta.url).href,
        new URL('@/assets/images/Day-to-Dusk-SHP-Corrected-1.jpg', import.meta.url).href
      ],
      [
        new URL('@/assets/images/Day-to-Dusk-SHP-Raw-2.jpg', import.meta.url).href,
        new URL('@/assets/images/Day-to-Dusk-SHP-Corrected-2.jpg', import.meta.url).href
      ],
      [
        new URL('@/assets/images/Day-to-Dusk-SHP-Raw-3.jpg', import.meta.url).href,
        new URL('@/assets/images/Day-to-Dusk-SHP-Corrected-3.jpg', import.meta.url).href
      ]
    ]
  };

  // State to manage which image slider is currently active
  const [currentSlide, setCurrentSlide] = useState(0);

  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="advance-container">
      <div className="carousel-container">
        <div className="carousel-content">
          {/* Image Comparison Slider Carousel */}
          <div className="image-slider-container">
            <ImageComparisonSlider
              beforeImage={service.images[currentSlide][0]} // Before image (first in the pair)
              afterImage={service.images[currentSlide][1]}  // After image (second in the pair)
            />
            {/* Dots for controlling the image comparison slider */}
            <div className="dots">
              {service.images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => changeSlide(index)}
                />
              ))}
            </div>
          </div>
          <div className="content-area">
            <h4 className='content-area-title'>{service.title}</h4>
            <p className="price">{service.price}</p>
            <button className="add-to-cart-btn"><Link to={service.addToCartBtn} className='
              text-black'> Add to Cart</Link></button>
            <button className="details-btn"><Link to={service.addToCartBtn} className='
              text-black'> More Details</Link></button>
            <p className="description">{service.description}</p>
            <ul className="features-list">
              {service.features.map((feature, index) => (
                <li key={index}>
                  <span className='pr-1'>{feature.included ? <CircleCheck className='text-green-500' /> : <CircleX className='text-primaryRed' />}</span> {feature.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UAVRetouching;
