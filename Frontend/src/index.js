import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux"; // Import the Redux Provider
import store from "./store"; // Import your Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-234sffsf.auth0.com"
    clientId="4neLeyiKPRTY1tVdajflskjflasjfly"
    redirectUri={window.location.origin}
  >
    {/* Nest the Redux Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
);
