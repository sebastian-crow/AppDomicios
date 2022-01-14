import axios from "axios";
import { CANCEL } from "redux-saga";
require("dotenv").config();
let client;

export const getSessionToken = () => {
  const uiStore = localStorage.getItem("store");
  var ui = JSON.parse(uiStore);
  if (ui) return ui.login.user.token;
  else return null;
};
// axios client factory ...
// useful in case we want to setup custom interceptors for e.g. regular token refresh etc...
function getClient() {
  if (!client) {
    client = axios.create({
      baseURL: process.env.REACT_APP_BACK_END + "/api" || "http://localhost:3006" + "/api",
    });
  }
  return client;
}

// helper method to invoke ajax call via axios, and set up a cancel token to cancel
// pending requests if needed.
const callAPI = (options) => {
  const token = getSessionToken();
  // returns a cancelable promise
  const cancel = axios.CancelToken.source();
  const opts = {
    ...options,
    cancelToken: cancel.token,
  };
  if (token) {
    opts.headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    };
  } else {
    opts.headers = {
      Accept: "application/json",
    };
  }

  const promise = getClient().request(opts);
  promise[CANCEL] = cancel.cancel;
  return promise;
};

export function login(params) {
  return callAPI({
    method: "POST",
    url: `/auth`,
    data: params,
  });
}

export function register(params) {
  return callAPI({
    method: "POST",
    url: `/register`,
    data: params,
  });
}

export function editUser(params) {
  return callAPI({
    method: "PATCH",
    url: `/user`,
    data: params.data,
  });
}

export function createPosition(params) {
  return callAPI({
    method: "POST",
    url: `/positionUser`,
    data: params,
  });
}

export function getPositionFromUser(id) {
  return callAPI({
    method: "GET",
    url: `/position/user/${id}`,
  });
}

export function getAllUsers() {
  return callAPI({
    method: "GET",
    url: `/users`,
  });
}

export function getAllClients() {
  return callAPI({
    method: "GET",
    url: `/user/client`,
  });
}

export function getAllDomiciliarys() {
  return callAPI({
    method: "GET",
    url: `/user/domiciliary`,
  });
}


// Orders
export function getAllOrders() {
  return callAPI({
    method: "GET",
    url: `/order`,
  });
}

export function createOrder(params) {
  return callAPI({
    method: "POST",
    url: `/order`,
    data: params,
  });
}

export function updateOrder(params) {
  return callAPI({
    method: "PATCH",
    url: `/order` + params.id,
    data: params.data,
  });
}

export function deleteOrder(params) {
  return callAPI({
    method: "DELETE",
    url: `/order` + params.id,
    data: params.data,
  });
}

// Sheets Orders
export function getSheetsOrder(params) {
  return callAPI({
    method: "GET",
    url: params,
  });
}
