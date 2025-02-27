import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomPaymentService = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("existing");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    setOrderId("");
    setAmount("");
    setDescription("");
  };

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    const payload = {
      orderId: orderType === "existing" ? orderId : null,
      amount: parseFloat(amount),
      description: orderType === "new" ? description : `Payment for Order ID: ${orderId}`,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-paypal-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Payment initiation failed");

      // Redirect to PayPal checkout page
      navigate(`/checkout/${data.orderID}`);
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Custom Payment Service</h1>

      {/* Order Type Selection */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 rounded-md transition ${orderType === "existing" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => handleOrderTypeChange("existing")}
        >
          Existing Order
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-md transition ${orderType === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          onClick={() => handleOrderTypeChange("new")}
        >
          New Order
        </button>
      </div>

      {/* Payment Form */}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {orderType === "existing" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderId">
              Order ID
            </label>
            <input
              id="orderId"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter existing Order ID"
            />
          </div>
        )}

        {/* Payment Amount */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter payment amount"
          />
        </div>

        {/* Description for New Orders */}
        {orderType === "new" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Describe your new order"
            />
          </div>
        )}

        {/* PayPal Checkout Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Proceed to PayPal
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomPaymentService;
