import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch product data from the backend
    fetch('/api/products/1') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setProduct(data));
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>View Product</button>
      {isModalOpen && product && (
        <ProductModal product={product} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProductPage;