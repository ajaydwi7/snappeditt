import React, { useState, useEffect, useRef } from 'react';
import './TestimonialSlider.css';
import AvatarMan from '../../../assets/images/avatar-man.webp';
import AvatarWoman from '../../../assets/images/avatar-women.webp';

const TestimonialSection = () => {
  const testimonials = [
    {
      img: AvatarMan,
      quote: "The ability to capture responses is a game-changer. If a user gets tired of the sign-up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
      name: 'Jessie J',
      role: 'Acme LTD'
    },
    {
      img: AvatarMan,
      quote: "The ability to capture responses is a game-changer. If a user gets tired of the sign-up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
      name: 'Jessie J',
      role: 'Acme LTD'
    },
    {
      img: AvatarMan,
      quote: "The ability to capture responses is a game-changer. If a user gets tired of the sign-up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
      name: 'Jessie J',
      role: 'Acme LTD'
    },
    {
      img: AvatarWoman,
      quote: "Having the power to capture user feedback is revolutionary. Even if a participant abandons the sign-up process midway, their valuable input remains intact.",
      name: 'Nick V',
      role: 'Malika Inc.'
    },
    {
      img: AvatarWoman,
      quote: "The functionality to capture responses is a true game-changer. Even if a user becomes fatigued during sign-up and abandons the process, their information remains stored.",
      name: 'Amelia W',
      role: 'Panda AI'
    },
    {
      img: AvatarMan,
      quote: "The ability to capture responses is a game-changer. If a user gets tired of the sign-up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
      name: 'Jessie J',
      role: 'Acme LTD'
    }
  ];

  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);
  const autorotateTiming = 7000;
  const testimonialsRef = useRef(null);

  useEffect(() => {
    let autorotateInterval;
    if (autorotate) {
      autorotateInterval = setInterval(() => {
        setActive(prev => (prev + 1 === testimonials.length ? 0 : prev + 1));
      }, autorotateTiming);
    }
    return () => clearInterval(autorotateInterval);
  }, [autorotate, testimonials.length]);

  useEffect(() => {
    heightFix();
  }, [active]);

  const heightFix = () => {
    testimonialsRef.current.style.height = testimonialsRef.current.children[active].offsetHeight + 'px';
  };

  return (
    <section className="testimonial-section">
      <div className="section-header">
        <h2>What Our Clients Say</h2>
        <p>See what our customers have to say about our services.</p>
      </div>

      <div className="testimonial-container">
        <div className="gradient-bg"></div> {/* Gradient background here */}
        <div className="image-container">
          <div className="image-wrapper">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`image-item ${active === index ? 'active' : ''}`}>
                <img src={testimonial.img} alt={testimonial.name} className="testimonial-image" />
              </div>
            ))}
          </div>
        </div>

        {/* Rest of the content */}
        <div className="text-container" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`text-item ${active === index ? 'active' : ''}`}>
              <blockquote className="testimonial-quote">
                {testimonial.quote}
              </blockquote>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="buttons-container">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              className={`button-item ${active === index ? 'active' : ''}`}
              onClick={() => {
                setActive(index);
                setAutorotate(false);
              }}
            >
              <span>{testimonial.name} - {testimonial.role}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
