import React, { useState } from 'react';
import "./Gallery.css";
import image1 from "@/assets/images/Gallery/Album-Retouch-P-Corrected-1-scaled.jpg";
import image2 from "@/assets/images/Gallery/Album-Retouch-SHP-Corrected-1-scaled.jpg";
import image3 from "@/assets/images/Gallery/Baby-SPH-Corrected-2.jpg";
import image4 from "@/assets/images/Gallery/Clipping-Path-P-Corrected-1.jpg";
import image5 from "@/assets/images/Gallery/Day-to-Dusk-P-Corrected-1.jpg";
import image6 from "@/assets/images/Gallery/Extraction-P-Corrected-1.jpg";
import image7 from "@/assets/images/Gallery/Popup-pic-1.png";
import image8 from "@/assets/images/Gallery/School-SHP-1.jpg";
import image9 from "@/assets/images/Gallery/Sports-SHP-1.jpg";
import image10 from "@/assets/images/Gallery/Window-Masking-Corrected-1.jpg";
import image11 from "@/assets/images/Gallery/Floor-Plans-P-2.jpg";


const ImageGallery = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];
  const [currentImage, setCurrentImage] = useState(null);

  const openImage = (index) => setCurrentImage(index);
  const closeImage = () => setCurrentImage(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((currentImage + 1) % images.length);
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Helping photographers do what they do best … <br />shoot amazing pictures.</h2>
      <div className="gallery-grid mt-[50px]">
        {images.map((src, index) => (
          <div key={index} onClick={() => openImage(index)}>
            <img className="gallery-image" src={src} alt={`Gallery image ${index + 1}`} />
          </div>
        ))}
      </div>

      {currentImage !== null && (
        <div className="lightbox" onClick={closeImage}>
          <span className="close">&times;</span>
          <img src={images[currentImage]} alt={`Gallery image ${currentImage + 1}`} />
          <span className="prev" onClick={prevImage}>&#10094;</span>
          <span className="next" onClick={nextImage}>&#10095;</span>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
