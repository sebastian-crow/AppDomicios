import axios from "axios";
import { CANCEL } from "redux-saga";
require("dotenv").config();
let client;

export const getSessionToken = () => {
  const uiStore = sessionStorage.getItem("store");
  var ui = JSON.parse(uiStore);
  if (ui) return ui.login.usuario.token;
  else return null;
};
// axios client factory ...
// useful in case we want to setup custom interceptors for e.g. regular token refresh etc...
function getClient() {
  if (!client) {
    client = axios.create({
      baseURL: process.env.REACT_APP_BACK_END || "http://localhost:3006",
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
    url: `/users/authenticate`,
    data: params,
  });
}

export function register(params) {
  return callAPI({
    method: "POST",
    url: `/users/register`,
    data: params,
  });
}

export function editarUsuario(params) {
  return callAPI({
    method: "PUT",
    url: `/users/update/` + params.id,
    data: params.data,
  });
}

export function createPosition(params) {
  return callAPI({
    method: "POST",
    url: `/position`,
    data: params,
  });
}

export function getPositionFromUser(id) {
  return callAPI({
    method: "GET",
    url: `/position/user/${id}`,
  });
}

export function updatePosition(params) {
  return callAPI({
    method: "PUT",
    url: `/position/${params.positionId}`,
    data: { position: JSON.stringify({ lat: params.lat, lng: params.lng }) },
  });
}

export function getAllUsers() {
  return callAPI({
    method: "GET",
    url: `/users`,
  });
}