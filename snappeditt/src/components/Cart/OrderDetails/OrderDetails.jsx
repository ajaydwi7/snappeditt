import React from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { Link } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = ({ service }) => {
  const { serviceStore } = useGlobalContext();
  const { addToCart, removeFromCart } = serviceStore;

  // Construct the service URL
  const serviceUrl = `/services/${service.categorySlug}/${service.serviceSlug}`;

  const handleIncreaseQuantity = () => {
    addToCart({ id: service.serviceId, name: service.serviceName }, 1);
  };

  const handleDecreaseQuantity = () => {
    addToCart({ id: service.serviceId, name: service.serviceName }, -1);
  };

  const handleRemove = () => {
    removeFromCart(service.serviceId);
  };

  return (
    <div className="order-details">
      <div className="order-detail">
        <div className="left-side">
          <Link to={serviceUrl}>
            <img src={service.featureImage} alt={service.serviceName} />
          </Link>
        </div>
        <div className="right-side">
          <h3>
            <Link className="text-primaryRed" to={serviceUrl}>
              {service.serviceName}
            </Link>
          </h3>
          {service.formData && (
            <ul>
              {Object.entries(service.formData)
                .filter(([key]) => key !== "Image Number")
                .map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className="order-price">
        <p>Price</p>
        <h3>${parseFloat(service.price).toFixed(2)}</h3>
      </div>
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
      <div className="remove">
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default OrderDetails;
