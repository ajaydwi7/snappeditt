import React, { useEffect } from 'react';

const LottiePlayer = ({ height = '80px', width = '80px', position = 'right-bottom' }) => {
  useEffect(() => {
    import('@dotlottie/player-component').catch((err) =>
      console.error("Failed to load Lottie Player:", err)
    );
  }, []);

  // Determine the class based on the position prop
  const getPositionClass = () => {
    switch (position) {
      case 'left-bottom':
        return 'bottom-0 left-10';
      case 'right-bottom':
      default:
        return 'bottom-0 right-0';
    }
  };

  return (
    <div className={`absolute ${getPositionClass()} z-20`}>
      <dotlottie-player
        src="https://lottie.host/0f95ab02-45dc-4b91-a626-ef5754d48fdd/oWuroGJKAf.json"
        background="transparent"
        speed="1"
        style={{
          width,
          height,
          filter: 'invert(32%) sepia(76%) saturate(6111%) hue-rotate(-5deg) brightness(91%) contrast(120%)',
        }}
        loop
        autoplay
      />
    </div>
  );
};

export default LottiePlayer;
