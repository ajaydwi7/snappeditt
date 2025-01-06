import React from "react";
import OrderDetails from "./OrderDetails/OrderDetails";
import OrderSummary from "./OrderSummary/OrderSummary";
import EmptyState from "./EmptyState/EmptyState";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

import "./Order.css";

const Order = () => {
  const { serviceStore } = useGlobalContext(); // Use serviceStore to access cart

  return (
    <div className="main-order-container">
      <div className="view-order">
        <div className="order-title">
          <h2>Order</h2>
          <h2>{serviceStore.state.cartQuantity} Items</h2>
        </div>
        <div className="order-container">
          {serviceStore.state.cart.length > 0 ? (
            serviceStore.state.cart.map((service) => (
              <OrderDetails
                key={service.id} // Ensure key is set to the unique `id` of the service
                service={service}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Order;
