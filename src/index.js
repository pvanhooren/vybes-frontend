import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// import history from "./utils/history";

import App from "./App";

import "./index.css";

const domain = process.env.REACT_APP_DOMAIN;
const clientId = process.env.REACT_APP_CLIENT_ID;
const audience = process.env.REACT_APP_AUDIENCE;

// const onRedirectCallback = (appState) => {
//   history.push(
//     appState && appState.returnTo ? appState.returnTo : window.location.pathname
//   );
// };

const providerConfig = {
  domain: domain,
  clientId: clientId,
  redirectUri: window.location.origin,
  audience: audience,
};

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Auth0Provider {...providerConfig}>
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
