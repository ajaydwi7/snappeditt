import { useState } from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { serviceStore, modal, auth } = useGlobalContext();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [phone, setPhone] = useState("");

  const setDelivery = (type) => {
    setDeliveryType(type);
  };

  const checkOut = async () => {
    // Check if the user is logged in
    if (!auth.state.user) {
      modal.openModal(); // Show login modal if the user is not logged in
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    const services = serviceStore.state.cart.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      featureImage: item.featureImage,
      formData: item.formData,
    }));

    const payload = {
      user_id: auth.state.user?.id,
      services,
      deliveryType,
      deliveryCost: deliveryType === "Standard" ? 0 : 1.0,
      totalCost: serviceStore.state.cartTotal + (deliveryType === "Standard" ? 0 : 1.0),
      phoneNumber: phone,
    };

    try {
      const response = await serviceStore.confirmOrder(payload);

      if (response.showRegisterLogin) {
        modal.openModal(); // If user needs to log in, show login modal
        return;
      }

      toast.success("Your order has been placed successfully");

      // Clear cart after successful order
      serviceStore.clearCart();
    } catch (error) {
      toast.error("Error confirming order. Please try again.");
    }
  };

  // Calculate total cost including shipping
  const cartTotal = Number(serviceStore.state.cartTotal) || 0;
  const totalCost = cartTotal + (deliveryType === "Standard" ? 0 : 1.0);

  return (
    <div className="is-order-summary">
      <div className="sub-container">
        <div className="contains-order">
          <div className="total-cost">
            <h4>Total Items ({serviceStore.state.cartQuantity})</h4>
            <h4>${cartTotal.toFixed(2)}</h4>
          </div>
          <div className="shipping">
            <h4>Shipping</h4>
            <select
              className="select-dropdown"
              onChange={(item) => setDelivery(item.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
            </select>
          </div>
          <div className="promo-code">
            <h4>Phone Number</h4>
            <input
              className="select-dropdown"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(item) => setPhone(item.target.value)}
            />
            <small>
              <em style={{ color: "#ff2100" }}>
                Your number will be used to verify the order placement.
              </em>
            </small>
          </div>
          <div className="final-cost">
            <h4>Total Cost</h4>
            <h4>${totalCost.toFixed(2)}</h4>
          </div>
          <div className="final-checkout">
            <button
              className="flat-button checkout"
              onClick={checkOut}
              disabled={serviceStore.state.cartQuantity === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
