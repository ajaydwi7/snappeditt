import { useReducer, useEffect } from "react";
import localforage from "localforage";
import { toast } from "react-toastify";

const initialState = {
  services: [],
  cart: [],
  cartTotal: 0,
  cartQuantity: 0,
};

const actions = {
  LOAD_CART: "LOAD_CART",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  ADD_QUANTITY: "ADD_QUANTITY",
  REDUCE_QUANTITY: "REDUCE_QUANTITY",
  UPDATE_ORDER_STATUS: "UPDATE_ORDER_STATUS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_CART: {
      const { cart, cartTotal, cartQuantity } = action.payload;
      return { ...state, cart, cartTotal, cartQuantity };
    }

    case actions.ADD_TO_CART: {
      const { service, imageNumber } = action.payload;

      const serviceToAdd = {
        ...service,
        quantity: imageNumber,
        totalPrice: (service.price * imageNumber).toFixed(2),
      };

      const existingServiceIndex = state.cart.findIndex(
        (item) => item.id === service.id
      );

      let updatedCart;

      if (existingServiceIndex >= 0) {
        updatedCart = state.cart.map((item, index) =>
          index === existingServiceIndex
            ? {
                ...item,
                quantity: item.quantity + imageNumber,
                totalPrice: (
                  parseFloat(item.totalPrice) +
                  parseFloat(serviceToAdd.totalPrice)
                ).toFixed(2),
              }
            : item
        );
      } else {
        updatedCart = [...state.cart, serviceToAdd];
      }

      const cartTotal = updatedCart.reduce(
        (acc, item) => acc + parseFloat(item.totalPrice),
        0
      );

      const cartQuantity = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      localforage.setItem("cartServices", updatedCart);

      return { ...state, cart: updatedCart, cartTotal, cartQuantity };
    }

    case actions.REMOVE_FROM_CART: {
      const newCart = state.cart.filter((item) => item.id !== action.serviceId);
      const cartTotal = newCart.reduce((acc, item) => acc + item.totalPrice, 0);
      const cartQuantity = newCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      localforage.setItem("cartServices", newCart);

      return { ...state, cart: newCart, cartTotal, cartQuantity };
    }

    case actions.CLEAR_CART: {
      localforage.setItem("cartServices", []);
      return { ...state, cart: [], cartTotal: 0, cartQuantity: 0 };
    }

    case actions.ADD_QUANTITY: {
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.serviceId) {
          const newQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: (item.price * newQuantity).toFixed(2),
          };
        }
        return item;
      });

      const cartTotal = updatedCart.reduce(
        (acc, item) => acc + parseFloat(item.totalPrice),
        0
      );

      const cartQuantity = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      localforage.setItem("cartServices", updatedCart);

      return { ...state, cart: updatedCart, cartTotal, cartQuantity };
    }

    case actions.REDUCE_QUANTITY: {
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.serviceId && item.quantity > 1) {
          const newQuantity = item.quantity - 1;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: (item.price * newQuantity).toFixed(2),
          };
        }
        return item;
      });

      const filteredCart = updatedCart.filter((item) => item.quantity > 0);

      const cartTotal = filteredCart.reduce(
        (acc, item) => acc + parseFloat(item.totalPrice),
        0
      );

      const cartQuantity = filteredCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      localforage.setItem("cartServices", filteredCart);

      return { ...state, cart: filteredCart, cartTotal, cartQuantity };
    }

    case actions.UPDATE_ORDER_STATUS: {
      const { orderId, status } = action.payload;
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        ),
      };
    }

    default:
      return state;
  }
};

const useServiceStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = (await localforage.getItem("cartServices")) || [];
      const cartTotal = storedCart.reduce(
        (acc, item) => acc + parseFloat(item.totalPrice),
        0
      );
      const cartQuantity = storedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      dispatch({
        type: actions.LOAD_CART,
        payload: { cart: storedCart, cartTotal, cartQuantity },
      });
    };

    loadCart();
  }, []);

  const addToCart = (service, imageNumber = 1) => {
    dispatch({
      type: actions.ADD_TO_CART,
      payload: { service, imageNumber },
    });
    toast.success(`${service.name} added to cart!`);
  };

  const removeFromCart = (serviceId) => {
    dispatch({ type: actions.REMOVE_FROM_CART, serviceId });
  };

  const clearCart = () => {
    dispatch({ type: actions.CLEAR_CART });
  };

  const addQuantity = (serviceId) => {
    dispatch({ type: actions.ADD_QUANTITY, serviceId });
  };

  const reduceQuantity = (serviceId) => {
    dispatch({ type: actions.REDUCE_QUANTITY, serviceId });
  };

  const confirmOrder = async (orderDetails) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to confirm order");
      }

      const data = await response.json();

      dispatch({ type: actions.CLEAR_CART });

      return data;
    } catch (error) {
      console.error("Error confirming order:", error);
      throw error;
    }
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({
      type: actions.UPDATE_ORDER_STATUS,
      payload: { orderId, status },
    });
  };

  return {
    state,
    addToCart,
    removeFromCart,
    clearCart,
    addQuantity,
    reduceQuantity,
    confirmOrder,
    updateOrderStatus,
  };
};

export default useServiceStore;
