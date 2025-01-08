import React from "react";
import ReactDOM from "react-dom/client";

import axios from "axios";
import App from "./App";
import GlobalContext from "./components/GlobalContext/GlobalContext";
import "./assets/css/main.css";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "AZklgsI9Ka6H86N64fo8l3ZOXWHXpwXP3tl7Bbe0MTiVt4fXp1cqTwY6xhct2zQrhZCNcUOgjHgSdKUD", // Replace with your PayPal client ID
  currency: "USD",
};


// Configure Axios globally
axios.defaults.baseURL = 'http://localhost:3000'; // Replace with your backend URL
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
