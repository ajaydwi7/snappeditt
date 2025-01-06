import { useReducer } from "react";
import { toast } from "react-toastify";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const actions = {
  FETCH_ORDERS: "FETCH_ORDERS",
  PLACE_ORDER: "PLACE_ORDER",
  CANCEL_ORDER: "CANCEL_ORDER",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  UPDATE_ORDER_PROGRESS: "UPDATE_ORDER_PROGRESS",
  UPDATE_ORDER_STATUS: "UPDATE_ORDER_STATUS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_ORDERS:
      return { ...state, orders: action.orders, loading: false };
    case actions.PLACE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order],
        loading: false,
      };
    case actions.CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.orderId
            ? { ...order, status: "Cancelled", percentage_complete: 0 }
            : order
        ),
        loading: false,
      };
    case actions.UPDATE_ORDER_PROGRESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.orderId
            ? { ...order, percentage_complete: action.percentage }
            : order
        ),
      };
    case actions.UPDATE_ORDER_STATUS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.order._id ? action.order : order
        ),
      };
    case actions.SET_LOADING:
      return { ...state, loading: true };
    case actions.SET_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

const useOrderStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOrders = async (userId) => {
    dispatch({ type: actions.SET_LOADING });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/user/${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      dispatch({ type: actions.FETCH_ORDERS, orders: data });
    } catch (error) {
      dispatch({ type: actions.SET_ERROR, error: error.message });
      toast.error("Error fetching orders: " + error.message);
    }
  };

  const placeOrder = async (orderData) => {
    dispatch({ type: actions.SET_LOADING });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(orderData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to place order");
      }
      dispatch({ type: actions.PLACE_ORDER, order: data.order });
      toast.success("Order placed successfully!");
    } catch (error) {
      dispatch({ type: actions.SET_ERROR, error: error.message });
      toast.error("Error placing order: " + error.message);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      dispatch({ type: actions.CANCEL_ORDER, orderId });
      toast.success("Order cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling order:", error);
      dispatch({ type: actions.SET_ERROR, error: error.message });
      toast.error("Failed to cancel order: " + error.message);
    }
  };

  const updateOrderProgress = (orderId, percentage) => {
    dispatch({
      type: actions.UPDATE_ORDER_PROGRESS,
      orderId,
      percentage,
    });
  };

  const getOrderStatus = async (orderId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/${orderId}`
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch order status");
      }
      const order = await response.json();
      dispatch({ type: actions.UPDATE_ORDER_STATUS, order });
      return order;
    } catch (error) {
      console.error("Error fetching order status:", error);
      throw error;
    }
  };

  return {
    state,
    fetchOrders,
    placeOrder,
    cancelOrder,
    updateOrderProgress,
    getOrderStatus,
  };
};

export default useOrderStore;
