import { useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../helpers/checkExpiration"; // Adjust path as needed

const initialState = {
  cart: [],
  cartTotal: 0,
  cartQuantity: 0,
};

const actions = {
  LOAD_CART: "LOAD_CART",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_CART:
      return { ...state, ...action.payload };
    case actions.ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        cartTotal: action.payload.cartTotal,
        cartQuantity: action.payload.cartQuantity,
      };
    case actions.REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.payload.cart,
        cartTotal: action.payload.cartTotal,
        cartQuantity: action.payload.cartQuantity,
      };
    case actions.CLEAR_CART:
      return { cart: [], cartTotal: 0, cartQuantity: 0 };
    default:
      return state;
  }
};

const useServiceStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user && user.id) {
      fetchCart(user.id); // Fetch the cart from the server on page load
    }
  }, []);

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${userId}`
      );

      // Handle 404 response (cart not found)
      if (response.status === 404) {
        dispatch({
          type: actions.LOAD_CART,
          payload: {
            cart: [],
            cartTotal: 0,
            cartQuantity: 0,
          },
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();

      // Update state with fetched cart data
      dispatch({
        type: actions.LOAD_CART,
        payload: {
          cart: data.items || [], // Updated to use `items` instead of `services`
          cartTotal: data.cartTotal,
          cartQuantity: data.cartQuantity,
        },
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart.");
    }
  };

  const addToCart = async (item) => {
    try {
      const user = getUserFromLocalStorage();

      if (!user || !user.id) {
        toast.error("You must be logged in to add items to the cart.");
        return;
      }

      // Ensure finalPrice is properly calculated before sending to API

      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          item,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const updatedCart = await response.json();

      dispatch({
        type: actions.ADD_TO_CART,
        payload: {
          cart: updatedCart.items || [],
          cartTotal: updatedCart.cartTotal,
          cartQuantity: updatedCart.cartQuantity,
        },
      });

      toast.success(`${item.serviceName} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  const updateCartQuantity = async (serviceId, quantity) => {
    try {
      const user = getUserFromLocalStorage();

      if (!user || !user.id) {
        toast.error("You must be logged in to update the cart.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            serviceId,
            quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedCart = await response.json();

      dispatch({
        type: actions.ADD_TO_CART,
        payload: {
          cart: updatedCart.items || [],
          cartTotal: updatedCart.cartTotal,
          cartQuantity: updatedCart.cartQuantity,
        },
      });

      toast.success("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart.");
    }
  };

  const removeFromCart = async (serviceId) => {
    try {
      const user = getUserFromLocalStorage();

      if (!user || !user.id) {
        toast.error("You must be logged in to remove items from the cart.");
        return;
      }

      if (!serviceId) {
        toast.error("Service ID is required to remove items from the cart.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            serviceId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const updatedCart = await response.json();

      dispatch({
        type: actions.REMOVE_FROM_CART,
        payload: {
          cart: updatedCart.items || [], // Updated to use `items`
          cartTotal: updatedCart.cartTotal,
          cartQuantity: updatedCart.cartQuantity,
        },
      });

      toast.success("Item removed from cart.");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart.");
    }
  };

  const clearCart = async (userId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/cart/clear/${userId}`, {
        method: "DELETE",
      });
      dispatch({ type: actions.CLEAR_CART });
      toast.success("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart.");
    }
  };

  return {
    state,
    fetchCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  };
};

export default useServiceStore;
