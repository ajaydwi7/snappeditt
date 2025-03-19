import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
import GlobalContext from "./components/GlobalContext/GlobalContext";
import "./assets/css/main.css";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  "disable-funding": "credit,card",
  "data-sdk-integration-source": "sandbox",
};


// Configure Axios globally
axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Replace with your backend URL
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <PayPalScriptProvider options={initialOptions}>
        <GlobalContext>
          <App />
        </GlobalContext>
      </PayPalScriptProvider>
    </React.StrictMode>
  </BrowserRouter>
);
