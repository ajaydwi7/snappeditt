import { createContext, useContext } from "react";
import useServiceStore from "../../store/serviceStore"; // Service Store
import useAuth from "../../store/auth";
import useModal from "../../store/modal";
import useOrderStore from "../../store/orderStore";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

const GlobalContext = ({ children }) => {
  const serviceStore = useServiceStore(); // Initialize the service store
  const auth = useAuth();
  const modal = useModal();
  const orders = useOrderStore(); // Initialize the order store

  return (
    <globalContext.Provider
      value={{
        serviceStore,
        auth,
        modal,
        orders, // Provide orders through context
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContext;