import React from "react";
import ReactDOM from "react-dom/client";

import axios from "axios";
import App from "./App";
import GlobalContext from "./components/GlobalContext/GlobalContext";
import "./assets/css/main.css";
import { BrowserRouter } from "react-router-dom";


// Configure Axios globally
axios.defaults.baseURL = 'http://localhost:3000'; // Replace with your backend URL
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalContext>
        <App />
      </GlobalContext>
    </React.StrictMode>
  </BrowserRouter>
);
