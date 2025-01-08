import React from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { Link, useParams } from "react-router-dom";

import "./OrderDetails.css";

const OrderDetails = ({ service }) => {
  const { serviceStore } = useGlobalContext();

  // Handle increasing quantity
  const handleIncreaseQuantity = () => {
    serviceStore.addQuantity(service.id);
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = () => {
    serviceStore.reduceQuantity(service.id);
  };

  // Handle removing the service from the cart
  const handleRemove = () => {
    serviceStore.removeFromCart(service.id);
  };

  const { categorySlug, serviceSlug } = useParams();

  return (
    <div className="order-details">
      <div className="order-detail">
        <div className="left-side">
          {/* Display the service image with a link */}
          <Link to={`/services/${service.categorySlug}/${service.serviceSlug}`}>
            <img src={service.featureImage} alt={service.name} />
          </Link>
        </div>
        <div className="right-side">
          {/* Display the service name with a link */}
          <h3>
            <Link to={`/services/${service.serviceSlug || service.id}`}>{service.name}</Link>
          </h3>
          <p>{service.description}</p>
          {/* Display additional form data */}
          {service.formData && (
            <div className="additional-details">
              <ul>
                {Object.entries(service.formData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Display the total price */}
      <div className="order-price">
        <p>Price</p>
        <h3>${parseFloat(service.price).toFixed(2)}</h3>
      </div>

      {/* Quantity adjustment controls */}
      <div className="quantity">
        <p>Quantity</p>
        <div className="increase-quantity">
          <button onClick={handleDecreaseQuantity} disabled={service.quantity <= 1}>
            -
          </button>
          <p>{service.quantity}</p>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
      </div>

      {/* Remove service from cart */}
      <div className="remove">
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default OrderDetails;
