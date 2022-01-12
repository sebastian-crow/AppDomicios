import {
  takeLatest,
  takeEvery,
  put,
  call,
  cancelled,
  select,
} from "redux-saga/effects";

import { push } from "redux-first-history";
import { api } from "./api";
import {
  loginAction,
  loginDoneAction,
  logoutAction,
  cleanSessionStateAcion,
  saveSessionStateAction,
  registerAction,
  registerDoneAction,
  errorRegistro,
  actualizarUsuarioAction,
  actualizarUsuarioDoneAction,

  // Client Position
  createPositionClientAction,
  createPositionClientDoneAction,
  updatePositionClientAction,
  updatePositionClientDoneAction,
  getFromClientPositionAction,
  getFromClientPositionDoneAction,

  // Dealer Position
  createPositionDealerAction,
  createPositionDealerDoneAction,
  updatePositionDealerAction,
  updatePositionDealerDoneAction,
  getFromDealerPositionAction,
  getFromDealerPositionDoneAction,
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
  restoreSessionStateAction,
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

  // Dealers
  getAllDomiciliarioAction,
  getAllDomiciliarioDoneAction,
  loginError,
  saveUrlPushAction,
  saveUrlPushDoneAction,

  // Sheets Orders
  getSheetsOrderAction,
  getSheetsOrderDoneAction,
} from "../reducer";

import { LOCATION_CHANGE } from "redux-first-history";

function* loginSaga(action) {
  try {
    const { data } = yield call(api.login, action.payload);
    if (data.status === 200) {
      var webPush = localStorage.getItem("webpush");
      var webPush = JSON.parse(webPush);
      if (webPush) {
        yield put(
          saveUrlPushAction({
            userId: data.data.user._id,
            urlPush: JSON.stringify(webPush),
          })
        );
      }
      yield put(loginDoneAction(data));
      yield put(push("/"));
    } else {
      yield put(loginError(data.message));
      console.log("All Wrong, check me and find the problem...");
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* loginDoneSaga(action) {
  try {
    yield put(saveSessionStateAction());
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* restoreSessionStateSaga(action) {
  try {
    const pathname = action.payload.location.pathname;
    yield put(push(pathname));
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* logoutSagas(action) {
  try {
    yield put(cleanSessionStateAcion());
  } catch (error) {
    console.log(error);
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

function* locationChangeSaga(action) {
  console.log(action.payload.location.pathname);
  const user = yield select((state) => state.login.usuario.user);
  if (user) {
    const pathname = action.payload.location.pathname;
    if (pathname === "/") {
      switch (user.rol) {
        case "cliente":
          yield put(push("/cliente/dashboard"));
          break;
        case "admin":
          yield put(push("/admin/dashboard"));
          break;
        case "domiciliario":
          yield put(push("/domiciliario/dashboard"));
          break;
        default:
          break;
      }
    }
  }
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

// Client Position
function* createPositionClientSaga(action) {
  try {
    const { data } = yield call(api.createPosition, action.payload);
    if (data.status === 200) {
      yield put(createPositionClientDoneAction(data));
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

function* updatePositionClientSaga(action) {
  try {
    const { data } = yield call(api.updatePosition, action.payload);
    if (data.status === 200) {
      yield put(updatePositionClientDoneAction(data));
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

// Dealer Position
function* createPositionDealerSaga(action) {
  try {
    const { data } = yield call(api.createPosition, action.payload);
    if (data.status === 200) {
      yield put(createPositionDealerDoneAction(data));
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

function* updatePositionDealerSaga(action) {
  try {
    const { data } = yield call(api.updatePosition, action.payload);
    if (data.status === 200) {
      yield put(updatePositionDealerDoneAction(data));
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

function* getFromDealerPositionSaga(action) {
  try {
    const { data } = yield call(api.getPositionFromUser, action.payload);
    if (data.status === "200") {
      yield put(getFromDealerPositionDoneAction(data));
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
    const data = yield call(api.deleteProduct, action.payload);
    if (data.status === 200) {
      yield put(deleteProductDoneAction());
      yield put(getAllProductAction());
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

// Sheets Orders
function* getSheetsOrderSaga(action) {
  try {
    const { data } = yield call(api.getSheetsOrder, action.payload);
    if (data) {
      yield put(getSheetsOrderDoneAction(data));
    } else {
      console.log("You have many errors");
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* saveUrlPushSaga(action) {
  try {
    const { data } = yield call(api.savePushUrl, action.payload);

    if (data.status === 200) {
      yield put(saveUrlPushDoneAction(data));
    } else {
      //yield put(errorDeleteOrder(data.status));
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

  yield takeEvery(restoreSessionStateAction.type, restoreSessionStateSaga);
  yield takeEvery(logoutAction.type, logoutSagas);

  // Client Location
  yield takeLatest(createPositionClientAction.type, createPositionClientSaga);
  yield takeLatest(updatePositionClientAction.type, updatePositionClientSaga);
  yield takeLatest(getFromClientPositionAction.type, getFromClientPositionSaga);

  // Dealer Location
  yield takeLatest(createPositionDealerAction.type, createPositionDealerSaga);
  yield takeLatest(updatePositionDealerAction.type, updatePositionDealerSaga);
  yield takeLatest(getFromDealerPositionAction.type, getFromDealerPositionSaga);
  //yield takeLatest(LOCATION_CHANGE, locationChangeSaga);
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);

  // Products
  yield takeLatest(getAllProductAction.type, getAllProductSaga);
  yield takeEvery(createProductAction.type, createProductSaga);
  yield takeLatest(updateProductAction.type, updateProductSaga);
  yield takeLatest(deleteProductAction.type, deleteProductSaga);

  // Users
  yield takeLatest(getAllUserAction.type, getAllUserSaga);
  yield takeLatest(getAllClientAction.type, getAllClientSaga);
  yield takeLatest(getAllDomiciliarioAction.type, getAllDomiciliarioSaga);

  // Orders
  yield takeLatest(getAllOrderAction.type, getAllOrderSaga);
  yield takeLatest(createOrderAction.type, createOrderSaga);
  yield takeLatest(updateOrderAction.type, updateOrderSaga);
  yield takeLatest(deleteOrderAction.type, deleteOrderSaga);
  yield takeLatest(saveUrlPushAction.type, saveUrlPushSaga);

  // Sheets Orders
  yield takeLatest(getSheetsOrderAction.type, getSheetsOrderSaga);
}
