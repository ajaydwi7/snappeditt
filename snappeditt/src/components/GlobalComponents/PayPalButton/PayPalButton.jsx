import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ cartTotal, cartItems, onSuccess }) => {
  // Create an order
  const createOrder = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/paypal/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderTotal: cartTotal,
          items: cartItems,
        }),
      });

      const data = await response.json();
      return data.id; // Return PayPal order ID
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  // Capture the order after approval
  const onApprove = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/paypal/capture-order/${data.orderID}`, {
        method: "POST",
      });

      const orderData = await response.json();

      if (orderData.status === "COMPLETED") {
        alert("Payment Successful!");
        onSuccess(orderData); // Trigger onSuccess callback
      } else {
        alert("Payment not completed.");
      }
    } catch (error) {
      console.error("Error capturing order:", error);
      alert("Failed to capture order.");
    }
  };

  // Handle errors
  const onError = (error) => {
    console.error("PayPal Button Error:", error);
    alert("An error occurred during the PayPal transaction.");
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
};

export default PayPalButton;
