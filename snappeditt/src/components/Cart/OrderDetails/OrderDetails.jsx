import React from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

import "./OrderDetails.css";

const OrderDetails = ({ service }) => {
  const { serviceStore } = useGlobalContext();

  // Handle increasing quantity
  const handleIncreaseQuantity = () => {
    serviceStore.addQuantity(service.id); // Calls the addQuantity method
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = () => {
    serviceStore.reduceQuantity(service.id); // Calls the reduceQuantity method
  };

  // Handle removing the service from the cart
  const handleRemove = () => {
    serviceStore.removeFromCart(service.id); // Calls the removeFromCart method
  };

  return (
    <div className="order-details">
      <div className="order-detail">
        <div className="left-side">
          {/* Display the service image */}
          <img src={service.featureImage} alt={service.name} />
        </div>
        <div className="right-side">
          {/* Display the service name and description */}
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      </div>

      {/* Display the total price */}
      <div className="order-price">
        <h3>${parseFloat(service.totalPrice).toFixed(2)}</h3>
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
