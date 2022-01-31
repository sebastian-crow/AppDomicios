import axios from 'axios';
import { CANCEL } from 'redux-saga';
let client;

export const getSessionToken = () => {
  const uiStore = localStorage.getItem('store');
  var ui = JSON.parse(uiStore);
  if (ui) return ui.login.user.token;
  else return null;
};
// axios client factory ...
// useful in case we want to setup custom interceptors for e.g. regular token refresh etc...
function getClient() {
  if (!client) {
    client = axios.create({
      baseURL:
        process.env.REACT_APP_BACK_END + '/api' ||
        'http://localhost:3006' + '/api',
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
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };
  } else {
    opts.headers = {
      Accept: 'application/json',
    };
  }

  const promise = getClient().request(opts);
  promise[CANCEL] = cancel.cancel;
  return promise;
};

export function login(params) {
  return callAPI({
    method: 'POST',
    url: `/auth`,
    data: params,
  });
}

export function register(params) {
  return callAPI({
    method: 'POST',
    url: `/register`,
    data: params,
  });
}

export function editUser(params) {
  return callAPI({
    method: 'PATCH',
    url: `/user/${params.id}`,
    data: params.data,
  });
}

export function createPosition(params) {
  return callAPI({
    method: 'POST',
    url: `/positionUser`,
    data: params,
  });
}

export function getPositionFromUser(id) {
  return callAPI({
    method: 'GET',
    url: `/position/user/${id}`,
  });
}

export function getAllUsers() {
  return callAPI({
    method: 'GET',
    url: `/users`,
  });
}

export function getAllClients() {
  return callAPI({
    method: 'GET',
    url: `/user/client`,
  });
}

export function getAllDomiciliarys() {
  return callAPI({
    method: 'GET',
    url: `/user/domiciliary`,
  });
}

// Orders
export function getAllOrdersByUserDomiciliary() {
  return callAPI({
    method: 'GET',
    url: `/order/user/domiciliary`,
  });
}

export function getAllOrdersByUser() {
  return callAPI({
    method: 'GET',
    url: `/order/user`,
  });
}

export function getAllOrdersByCompany(id) {
  console.log('Yes. you call me haha', id);
  return callAPI({
    method: 'GET',
    url: `/order/company/${id}`,
  });
}

export function getAllOrders() {
  return callAPI({
    method: 'GET',
    url: `/order`,
  });
}

export function getOrderById(id) {
  return callAPI({
    method: 'GET',
    url: `/order/${id}`,
  });
}

export function createOrder(params) {
  console.log('Params create order', params);
  return callAPI({
    method: 'POST',
    url: `/order`,
    data: params,
  });
}

export function updateOrder(params) {
  console.log('Update order data', params);
  return callAPI({
    method: 'PATCH',
    url: `/order/${Number(params.id)}`,
    data: params.data,
  });
}

export function deleteOrder(params) {
  return callAPI({
    method: 'DELETE',
    url: `/order/${params.id}`,
    data: params.data,
  });
}

// Orders Product

export function getOrderProductByOrderNumber(number) {
  return callAPI({
    method: 'GET',
    url: `/orderProduct/orderNumber/${number}`,
  });
}

export function getAllOrdersProductByIdUser(id) {
  return callAPI({
    method: 'GET',
    url: `/orderProduct/user/${id}`,
  });
}

export function getAllOrdersProductByUser() {
  return callAPI({
    method: 'GET',
    url: `/orderProduct/user`,
  });
}

export function getAllOrdersProduct() {
  return callAPI({
    method: 'GET',
    url: `/orderProduct`,
  });
}

export function createOrderProduct(params) {
  return callAPI({
    method: 'POST',
    url: `/orderProduct`,
    data: params,
  });
}

export function updateOrderProduct(params) {
  return callAPI({
    method: 'PATCH',
    url: `/orderProduct/${params.id}`,
    data: params.data,
  });
}

export function deleteOrderProduct(params) {
  return callAPI({
    method: 'DELETE',
    url: `/orderProduct/${params.id}`,
    data: params.data,
  });
}

// Sheets Orders
export function getSheetsOrder(params) {
  return callAPI({
    method: 'GET',
    url: params,
  });
}

// Update Sheets Orders
export function updateSheetsOrder(params) {
  return callAPI({
    method: 'GET',
    url: params,
  });
}

// Delete Sheets Orders
export function deleteSheetsOrder(params) {
  return callAPI({
    method: 'GET',
    url: params,
  });
}
