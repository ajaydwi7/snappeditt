import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

const Checkout = () => {
  const location = useLocation();
  const { serviceStore, orders } = useGlobalContext();
  const cart = serviceStore.state?.cart || []; // Ensure cart is an array
  const { clearCart } = serviceStore;

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

  const handlePaymentSuccess = async (orderData) => {
    try {
      await orders.placeOrder({
        user_id: location.state.userId,
        deliveryType: "Standard",
        phoneNumber: billingDetails.phone,
        services: cart,
        totalCost: location.state.cartTotal,
      });
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      toast.error("Failed to place order.");
    }
  };

  const handlePaymentError = (err) => {
    console.error("PayPal Error:", err);
    toast.error("Payment failed. Please try again.");
  };

  if (!cart.length) {
    return <div>Your cart is empty. Add some items before checkout!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Order Details */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Details</h3>
        <ul className="list-disc pl-5">
          {cart.map((item) => (
            <li key={item.id} className="mb-1">
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="font-bold mt-2">Total: ${location.state.cartTotal.toFixed(2)}</p>
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
        {location.state.cartTotal > 0 ? (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: location.state.cartTotal.toFixed(2),
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
