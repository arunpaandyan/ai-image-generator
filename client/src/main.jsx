import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
