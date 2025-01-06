import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import DeliveryEmpty from "@/components/Delivery/DeliveryEmpty/DeliveryEmpty";
import DeliveryItem from "@/components/Delivery/DeliveryItem/DeliveryItem";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const DeliveryView = () => {
  const { orders, auth, modal } = useGlobalContext();
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (auth.state.user) {
        // Fetch orders for the authenticated user
        await orders.fetchOrders(auth.state.user.id);
        setLoadingOrders(false); // Stop loading after fetching
      } else {
        modal.openModal(false); // Show login modal if user is not authenticated
        setLoadingOrders(false); // Stop loading if no user is authenticated
      }
    };

    fetchUserOrders();
  }, [auth.state.user]); // Depend on the user object

  const reloadOrders = async () => {
    setDisabled(true);
    toast.info("Reloading orders...");
    await orders.fetchOrders(auth.state.user.id); // Fetch orders again
    setDisabled(false);
    toast.success("Orders reloaded!");
  };

  // Sort orders in LIFO order (reverse order)
  const sortedOrders = [...orders.state.orders].reverse();

  return (
    <div>
      {/* Check if user is logged in */}
      {auth.state.user == null ? (
        <DeliveryEmpty />
      ) : (
        <div>
          {/* Reload Orders Button */}
          <div className="reload-orders">
            <button
              className="btn-rounded"
              onClick={reloadOrders}
              disabled={disabled}
            >
              Reload Orders
            </button>
          </div>

          {/* Show orders if available */}
          {loadingOrders ? (
            <Skeleton height={500} />
          ) : sortedOrders.length > 0 ? (
            sortedOrders.map((order) => (
              <DeliveryItem
                key={order._id}
                order={order}
              />
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryView;