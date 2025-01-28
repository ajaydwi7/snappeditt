import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import PayPalButton from "../GlobalComponents/PayPalButton/PayPalButton";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceStore, orders } = useGlobalContext();
  const cart = serviceStore.state?.cart || [];
  const { clearCart } = serviceStore;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  useEffect(() => {
    console.log("Updated billingDetails:", billingDetails);
  }, [billingDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateBillingDetails = () => {
    const { name, email, address, city, state, zip, phone } = billingDetails;
    if (!name || !email || !address || !city || !state || !zip || !phone) {
      toast.error("Please fill in all billing details.");
      return false;
    }
    return true;
  };

  const handlePaymentSuccess = async (orderData) => {
    try {
      setIsSubmitting(true);

      if (!validateBillingDetails()) {
        setIsSubmitting(false);
        return;
      }

      console.log("Billing Details before payment:", billingDetails);

      const orderPayload = {
        user_id: location.state.userId,
        deliveryType: "Standard",
        phoneNumber: billingDetails.phone,
        services: cart.map((item) => ({
          serviceId: item.serviceId || item.id,
          serviceName: item.serviceName,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
          totalPrice: parseFloat(item.price) * parseInt(item.quantity),
          featureImage: item.featureImage,
          formData: item.formData || {},
        })),
        totalCost: location.state.cartTotal,
        paypalOrderId: orderData.id,
        billingDetails: {
          ...billingDetails,
        },
      };

      await orders.placeOrder(orderPayload);
      await clearCart(location.state.userId);
      toast.success("Order placed successfully!");
      navigate("/delivery");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart.length) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-yellow-700">Your cart is empty. Add some items before checkout!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Details</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2">
            {cart.map((service) => (
              <li key={service.id} className="flex justify-between items-center">
                <span>{service.serviceName}</span>
                <span className="text-gray-600">
                  ${parseFloat(service.price).toFixed(2)} x {service.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="font-bold text-lg text-right">
              Total: ${location.state.cartTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Billing Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={billingDetails.name}
            onChange={handleInputChange}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={billingDetails.email}
            onChange={handleInputChange}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={billingDetails.phone}
            onChange={handleInputChange}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

          <input
            type="text"
            name="address"
            placeholder="Address *"
            value={billingDetails.address}
            onChange={handleInputChange}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

          <input
            type="text"
            name="city"
            placeholder="City *"
            value={billingDetails.city}
            onChange={handleInputChange}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

          <input
            type="text"
            name="state"
            placeholder="State *"
            value={billingDetails.state}
            onChange={handleInputChange}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

          <input
            type="text"
            name="zip"
            placeholder="ZIP Code *"
            value={billingDetails.zip}
            onChange={handleInputChange}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Payment</h3>
        {location.state.cartTotal > 0 && validateBillingDetails() ? (
          <PayPalButton
            cartTotal={location.state.cartTotal}
            cartItems={cart}
            onSuccess={handlePaymentSuccess}
            disabled={isSubmitting}
            phoneNumber={billingDetails.phone}
            userId={location.state.userId}
            billingDetails={billingDetails}
          />
        ) : (
          <p className="text-red-500">Cart total must be greater than zero to proceed with payment.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;