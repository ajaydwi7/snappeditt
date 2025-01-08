import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Checkout = ({ onPaymentSuccess }) => {
  const location = useLocation();
  const { cartItems = [], cartTotal = 0 } = location.state || {};

  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handlePaymentSuccess = (orderData) => {
    toast.success("Payment successful!");
    onPaymentSuccess(orderData);
  };

  const handlePaymentError = (err) => {
    console.error("PayPal Error:", err);
    toast.error("Payment failed. Please try again.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Order Details */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Details</h3>
        <ul className="list-disc pl-5">
          {cartItems.map((item) => (
            <li key={item.id} className="mb-1">
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="font-bold mt-2">Total: ${cartTotal.toFixed(2)}</p>
      </div>

      {/* Billing Details Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Billing Details</h3>
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={billingDetails.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={billingDetails.email}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={billingDetails.address}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={billingDetails.city}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={billingDetails.state}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={billingDetails.zip}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </form>
      </div>

      {/* Payment Integration */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Payment</h3>
        {cartTotal > 0 ? (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: cartTotal.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(handlePaymentSuccess);
            }}
            onError={handlePaymentError}
          />
        ) : (
          <p className="text-red-500">Cart total must be greater than zero to proceed with payment.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout; 