/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";

//import 'mapbox-gl/dist/mapbox-gl.css';
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store, history } from "./store/configureStore";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTPyLqPEcWRbRXyVyOAMsuEJCCBDfcP6c",
  authDomain: "domicilios-fc429.firebaseapp.com",
  projectId: "domicilios-fc429",
  storageBucket: "domicilios-fc429.appspot.com",
  messagingSenderId: "418482789934",
  appId: "1:418482789934:web:aee4be2e34061713d809bf",
  measurementId: "G-3YDXFN9P98"
};

const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
