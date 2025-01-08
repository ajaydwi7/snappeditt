import { useState } from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { serviceStore, modal, auth } = useGlobalContext();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const setDelivery = (type) => {
    setDeliveryType(type);
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const proceedToCheckout = () => {
    if (!auth.state.user) {
      modal.openModal();
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const cartItems = serviceStore.state.cart || [];
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    navigate("/checkout", { state: { cartItems, cartTotal } });
  };

  const cartItems = serviceStore.state.cart || [];
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCost = cartTotal + (deliveryType === "Standard" ? 0 : 1.0);

  return (
    <div className="is-order-summary">
      <div className="sub-container">
        <div className="contains-order">
          <div className="total-cost">
            <h4>Total Items ({serviceStore.state.cartQuantity})</h4>
            <h4>${cartTotal.toFixed(2)}</h4>
          </div>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>
                  ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
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
              type="tel"
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
              className="flat-button checkout bg-primaryBlack"
              onClick={proceedToCheckout}
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
