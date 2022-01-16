/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";

//import 'mapbox-gl/dist/mapbox-gl.css';
import "bootstrap/dist/css/bootstrap.css";
//import "./assets/scss/paper-dashboard.scss";
//import "assets/demo/demo.css";
import { Provider } from "react-redux";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { store } from "./store/configureStore";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

if (process.env.REACT_APP_PROJECT_STATUS !== "development") {
  serviceWorkerRegistration.register();
  reportWebVitals();
}
