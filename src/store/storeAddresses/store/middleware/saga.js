import { takeLatest, put, call, cancelled } from "redux-saga/effects";

import { api } from "./api";
import {
  loginAction,
  loginDoneAction,
  saveSessionStateAction,
  registerAction,
  registerDoneAction,
  errorRegistro,
  actualizarUsuarioAction,
  actualizarUsuarioDoneAction,
  updatePositionAction,
  updatePositionDoneAction,
  createPositionAction,
  createPositionDoneAction,
  getFromUserPositionAction,
  getFromUserPositionDoneAction,
  getAllUserAction,
  getAllUserDoneAction,

  // Products
  // eslint-disable-next-line 
  errorGetProducts, 
  getAllProductAction,
  getAllProductDoneAction,
  createProductAction,
  createProductDoneAction,
  errorCreateProduct,
  updateProductAction,
  updateProductDoneAction,
  // eslint-disable-next-line
  errorUpdateProduct,
  deleteProductAction,
  deleteProductDoneAction,
  errorDeleteProduct,


  // Orders
  // eslint-disable-next-line
  errorGetOrders,
  getAllOrderAction,
  getAllOrderDoneAction,
  createOrderAction,
  createOrderDoneAction,
  errorCreateOrder,
  updateOrderAction,
  updateOrderDoneAction,
  // eslint-disable-next-line
  errorUpdateOrder,
  deleteOrderAction,
  deleteOrderDoneAction,
  errorDeleteOrder,


  // Clients
  getAllClientAction,
  getAllClientDoneAction,
  getFromClientPositionAction,
  getFromClientPositionDoneAction,

  // Dealers
  getAllDomiciliarioAction,
  getAllDomiciliarioDoneAction,
  getFromDomiciliarioPositionAction,
  getFromDomiciliarioPositionDoneAction,

  loginError,
} from "../reducer";
import { LOCATION_CHANGE } from "redux-first-history";

function* loginSaga(action) {
  try {
    const { data } = yield call(api.login, action.payload);
    if (data.status === 200) {
      yield put(loginDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* loginDoneSaga() {
  try {
    yield put(saveSessionStateAction());
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* registerSaga(action) {
  try {
    const { data } = yield call(api.register, action.payload);
    if (data.status === 200) {
      yield put(registerDoneAction(data));
    } else {
      yield put(errorRegistro(data.status));
    }
  } catch (error) {
    yield put(errorRegistro("Error inesperado"));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* locationChangeSaga() {
  yield put(saveSessionStateAction());
}


function* actualizarUsuarioSaga(action) {
  try {
    const { data } = yield call(api.editarUsuario, action.payload);
    yield put(actualizarUsuarioDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// All users position
function* createPositionSaga(action) {
  try {
    const { data } = yield call(api.createPosition, action.payload);
    if (data.status === 200) {
      yield put(createPositionDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* updatePositionSaga(action) {
  try {
    const { data } = yield call(api.updatePosition, action.payload);
    if (data.status === 200) {
      yield put(updatePositionDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* getFromUserPositionSaga(action) {
  try {
    const { data } = yield call(api.getPositionFromUser, action.payload);
    if (data.status === "200") {
      yield put(getFromUserPositionDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}


// Domiciliarios position
function* getFromDomiciliarioPositionSaga(action) {
  try {
    const { data } = yield call(api.getPositionFromUser, action.payload);
    if (data.status === "200") {
      yield put(getFromDomiciliarioPositionDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// Clients position
function* getFromClientPositionSaga(action) {
  try {
    const { data } = yield call(api.getPositionFromUser, action.payload);
    if (data.status === "200") {
      yield put(getFromClientPositionDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}




// All users registred
function* getAllUserSaga() {
  try {
    const { data } = yield call(api.getAllUsers);
    if (data.status === "200") {
      yield put(getAllUserDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}


// All clients registred
function* getAllClientSaga() {
  try {
    const { data } = yield call(api.getAllClients);
    if (data.status === "200") {
      yield put(getAllClientDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// All dealers registred
function* getAllDomiciliarioSaga() {
  try {
    const { data } = yield call(api.getAllDomiciliarios);
    if (data.status === "200") {
      yield put(getAllDomiciliarioDoneAction(data));
    } else {
      yield put(loginError(data.message));
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}






// Products

function* getAllProductSaga() {
  try {
    const { data } = yield call(api.getAllProducts);
    if (data.status === "200") {
      yield put(getAllProductDoneAction(data));
    } else {
      console.log('No products')
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}


function* createProductSaga(action) {
  try {
    const { data } = yield call(api.createProduct, action.payload);
    if (data.status === 200) {
      yield put(createProductDoneAction(data));
    } else {
      yield put(errorCreateProduct(data.status));
    }
  } catch (error) {
    yield put(errorCreateProduct("Error inesperado"));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* updateProductSaga(action) {
  try {
    const { data } = yield call(api.updateProduct, action.payload);
    yield put(updateProductDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}





function* deleteProductSaga(action) {
  try {
    const { data } = yield call(api.deleteProduct, action.payload);
    if (data.status === 200) {
      yield put(deleteProductDoneAction(data));
    } else {
      yield put(errorDeleteProduct(data.status));
    }
  } catch (error) {
    yield put(errorDeleteProduct("Error inesperado"));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}


// Orders

function* getAllOrderSaga() {
  try {
    const { data } = yield call(api.getAllOrders);
    if (data.status === "200") {
      yield put(getAllOrderDoneAction(data));
    } else {
      console.log('No products')
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}


function* createOrderSaga(action) {
  try {
    const { data } = yield call(api.createOrder, action.payload);
    if (data.status === 200) {
      yield put(createOrderDoneAction(data));
    } else {
      yield put(errorCreateOrder(data.status));
    }
  } catch (error) {
    yield put(errorCreateOrder("Error inesperado"));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* updateOrderSaga(action) {
  try {
    const { data } = yield call(api.updateOrder, action.payload);
    yield put(updateOrderDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}





function* deleteOrderSaga(action) {
  try {
    const { data } = yield call(api.deleteOrder, action.payload);
    if (data.status === 200) {
      yield put(deleteOrderDoneAction(data));
    } else {
      yield put(errorDeleteOrder(data.status));
    }
  } catch (error) {
    yield put(errorDeleteOrder("Error inesperado"));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}




export function* rootSaga() {
  yield takeLatest(loginAction.type, loginSaga);
  yield takeLatest(loginDoneAction.type, loginDoneSaga);
  yield takeLatest(actualizarUsuarioAction.type, actualizarUsuarioSaga);
  yield takeLatest(registerAction.type, registerSaga);
  yield takeLatest(createPositionAction.type, createPositionSaga);
  yield takeLatest(updatePositionAction.type, updatePositionSaga);
  yield takeLatest(getFromUserPositionAction.type, getFromUserPositionSaga);
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);

  // Products
  yield takeLatest(getAllProductAction.type, getAllProductSaga);
  yield takeLatest(createProductAction.type, createProductSaga);
  yield takeLatest(updateProductAction.type, updateProductSaga);
  yield takeLatest(deleteProductAction.type, deleteProductSaga);

  // Users
  yield takeLatest(getAllUserAction.type, getAllUserSaga);
  yield takeLatest(getAllClientAction.type, getAllClientSaga);
  yield takeLatest(getAllDomiciliarioAction.type, getAllDomiciliarioSaga);
  
  // Dealers location
  yield takeLatest(getFromDomiciliarioPositionAction.type, getFromDomiciliarioPositionSaga);
  yield takeLatest(getFromClientPositionAction.type, getFromClientPositionSaga);


  // Orders
  yield takeLatest(getAllOrderAction.type, getAllOrderSaga);
  yield takeLatest(createOrderAction.type, createOrderSaga);
  yield takeLatest(updateOrderAction.type, updateOrderSaga);
  yield takeLatest(deleteOrderAction.type, deleteOrderSaga);


}




