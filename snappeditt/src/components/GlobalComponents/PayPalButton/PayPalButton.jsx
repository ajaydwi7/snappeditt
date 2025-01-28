import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const PayPalButton = ({ cartTotal, cartItems, onSuccess, disabled, userId, phoneNumber, billingDetails }) => {
  const createOrder = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const response = await fetch(`${apiUrl}/paypal/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderTotal: cartTotal.toFixed(2),
          items: cartItems.map((item) => ({
            name: item.serviceName || "Unnamed Service",
            unit_amount: { currency_code: "USD", value: parseFloat(item.price) },
            quantity: parseInt(item.quantity, 10) || 1,
          })),
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create PayPal order");
      }

      const orderData = await response.json();
      return orderData.id;
    } catch (error) {
      console.error("PayPal create order error:", error);
      toast.error("Failed to create PayPal order. Please try again.");
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      if (!data.orderID || !data.payerID) throw new Error("Order ID or Payer ID is missing.");

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const captureResponse = await fetch(`${apiUrl}/paypal/capture-order/${data.orderID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.orderID, payerId: data.payerID }),
        credentials: "include",
      });

      if (!captureResponse.ok) {
        const errorData = await captureResponse.json();
        throw new Error(errorData.error || "Failed to capture payment");
      }

      const captureData = await captureResponse.json();
      if (captureData.status === "COMPLETED") {
        const orderDetails = {
          user_id: userId,
          deliveryType: "Standard",
          phoneNumber,
          totalCost: cartTotal,
          paypalOrderId: captureData.id,
          billingDetails,
          services: cartItems.map((item) => ({
            serviceId: item.serviceId || item.id,
            serviceName: item.serviceName,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity, 10),
            totalPrice: parseFloat(item.price) * parseInt(item.quantity, 10),
            featureImage: item.featureImage,
            formData: item.formData || {},
          })),
        };

        const saveOrderResponse = await fetch(`${apiUrl}/order/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
          credentials: "include",
        });

        if (!saveOrderResponse.ok) {
          const errorData = await saveOrderResponse.json();
          throw new Error(errorData.error || "Failed to save order to database");
        }

        toast.success("Payment successful! Order has been placed.");
        await onSuccess(captureData);
      } else {
        toast.error(`Payment not completed. Status: ${captureData.status}`);
      }
    } catch (error) {
      console.error("PayPal capture error:", error);
      toast.error("Failed to process payment. Please try again.");
    }
  };

  return (
    <div className={`${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(error) => {
          console.error("PayPal error:", error);
          toast.error("An error occurred with PayPal. Please try again.");
        }}
        onCancel={() => {
          toast.info("Payment cancelled. You can try again when ready.");
        }}
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
        disabled={disabled}
      />
    </div>
  );
};

export default PayPalButton;