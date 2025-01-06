import React from 'react';
import ImageComparisonSlider from "../ImageComparisonSlider/ImageComparisonSlider";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>×</button>
        <div className="product-details">
          <div className="image-slider">
            {ImageComparisonSlider}
          </div>
          <div className="product-info">
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <form>
              <div>
                <label>Order Name*</label>
                <input type="text" placeholder="Order Name*" required />
              </div>
              <div>
                <label>Order Images*</label>
                <input type="text" placeholder="Provide WeTransfer, Dropbox or any cloud-based link" required />
              </div>
              <div>
                <label>Additional Order Details*</label>
                <textarea placeholder="Additional Order Details*" required></textarea>
              </div>
              <button type="submit">Add to Cart</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;