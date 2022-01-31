import {
  takeLatest,
  takeEvery,
  put,
  call,
  cancelled,
  select,
} from 'redux-saga/effects';

import { push } from 'redux-first-history';
import { api } from './api';
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
  getSheetsOrderErrorAction,
  restoreSessionStateAction,
  // Orders
  // eslint-disable-next-line
  errorGetOrders,
  getOrderByIdAction,
  getOrderByIdDoneAction,
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

  // Orders Products
  // eslint-disable-next-line
  getAllOrderProductAction,
  createOrderProductAction,
  updateOrderProductAction,
  deleteOrderProductAction,
  getAllOrderProductDoneAction,
  createOrderProductDoneAction,
  errorCreateOrderProduct,
  updateOrderProductDoneAction,
  deleteOrderProductDoneAction,
  getAllOrderProductErrorAction,
  errorDeleteOrderProduct,
  // eslint-disable-next-line
  // Clients
  getAllClientAction,
  getAllClientDoneAction,

  // Dealers
  getAllDomiciliaryAction,
  getAllDomiciliaryDoneAction,
  loginError,

  // Sheets Orders
  getSheetsOrderAction,
  getSheetsOrderDoneAction,
  updateSheetOrderAction,
  updateSheetOrderDoneAction,
  deleteSheetOrderAction,
  deleteSheesOrderDoneAction,
  getAllOrderProductByUserAction,
  getAllOrderProductByIdUserAction,
  getAllOrderByUserAction,
  getAllOrderByCompanyAction,
  getAllOrdersByUserDomiciliaryAction,
  getOrderProductByOrderNumberDoneAction,
  getOrderProductByOrderNumberAction,
  getAllOrderErrorAction,
} from '../reducer';

import { LOCATION_CHANGE } from 'redux-first-history';
import Cookies from 'js-cookie';

function* loginSaga(action) {
  try {
    const { data } = yield call(api.login, action.payload);
    if (data) {
      if (data.message) {
        yield put(loginError(data.message));
        return null;
      }
      var webPush = localStorage.getItem('webpush');
      var webPush = JSON.parse(webPush);
      if (webPush) {
        yield put(
          actualizarUsuarioAction({
            urlPush: JSON.stringify(webPush),
          })
        );
      }
      yield put(loginDoneAction(data));
      yield put(push('/'));
    } else {
      yield put(loginError('No existe un user'));
    }
  } catch (error) {
    console.error(error);
    yield put(loginError(error.message));
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
    const pathname = action.payload?.location.pathname;
    if (pathname) {
      var webPush = localStorage.getItem('webpush');
      var webPush = JSON.parse(webPush);
      if (webPush) {
        yield put(
          actualizarUsuarioAction({
            urlPush: JSON.stringify(webPush),
          })
        );
      }
      yield put(push(pathname));
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* logoutSagas(action) {
  try {
    yield put(cleanSessionStateAcion());
    localStorage.removeItem('ordersProduct');
    Cookies.remove('session');
  } catch (error) {
    console.error(error);
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* registerSaga(action) {
  try {
    const { data } = yield call(api.register, action.payload);
    if (data.message) {
      yield put(errorRegistro(data.message));
      return null;
    }
    yield put(registerDoneAction(data));
    yield put(push('/'));
  } catch (error) {
    yield put(errorRegistro('Error al registrar'));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* locationChangeSaga(action) {
  const lastRoute = window.location.href;
  const pathname = action.payload.location.pathname;
  console.log('Pathname', pathname);
  let routes = localStorage.getItem('locationLog');
  routes = JSON.parse(routes);
  let log = routes?.log || [];
  console.log('What is that log', log);
  if (!routes?.log) {
    log = [];
  }
  log.push(lastRoute);
  if (log.length > 3) {
    log.shift();
  }
  localStorage.setItem('locationLog', JSON.stringify({ log }));
  if (
    log[0].includes(
      `${process.env.REACT_APP_REACT_HOST}/client/takeorder/`
    ) &&
    log[1].includes(`${process.env.REACT_APP_REACT_HOST}/login`) &&
    log[2].includes(`${process.env.REACT_APP_REACT_HOST}/`)
  ) {
    let index = log[0].indexOf(`/client/takeorder/`);
    yield put(push(log[0].substr(index)));
  } else if (
    !lastRoute.includes(`/client/takeorder/`) &&
    !lastRoute.includes(`/register`)
  ) {
    const user = yield select((state) => state.login.user);
    if (user) {
      if (pathname === '/') {
        switch (user.role) {
          case 'company':
            yield put(push('/company/orderProducts'));
            break;
          case 'client':
            yield put(push('/client/orderslist'));
            break;
          case 'admin':
            yield put(push('/admin/orderslist'));
            break;
          case 'domiciliary':
            yield put(push('/domiciliary/orderslist'));
            break;
          default:
            break;
        }
      }
    }
  }
}

function* actualizarUsuarioSaga(action) {
  try {
    const { data } = yield call(api.editUser, action.payload);
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

function* getFromClientPositionSaga(action) {
  try {
    const { data } = yield call(
      api.getPositionFromUser,
      action.payload
    );
    yield put(getFromClientPositionDoneAction(data));
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

function* getFromDealerPositionSaga(action) {
  try {
    const { data } = yield call(
      api.getPositionFromUser,
      action.payload
    );
    yield put(getFromDealerPositionDoneAction(data));
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
    yield put(getAllUserDoneAction(data));
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
    yield put(getAllClientDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// All dealers registred
function* getAllDomiciliarySaga() {
  try {
    const { data } = yield call(api.getAllDomiciliarys);
    yield put(getAllDomiciliaryDoneAction(data));
  } catch (error) {
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
    yield put(getAllOrderDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* getOrderByIdSaga(action) {
  try {
    const { data } = yield call(api.getOrderById, action.payload);
    yield put(getOrderByIdDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* getAllOrderByUserSaga() {
  try {
    const { data } = yield call(api.getAllOrdersByUser);
    if (data.length === 0) {
      yield put(
        getAllOrderErrorAction('Error, no se encontraron datos')
      );
    }
    yield put(getAllOrderDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* getAllOrderByCompanySaga(action) {
  try {
    const { data } = yield call(
      api.getAllOrdersByCompany,
      action.payload
    );
    if (data.length === 0) {
      yield put(
        getAllOrderErrorAction('Error, no se encontraron datos')
      );
    }
    yield put(getAllOrderDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* getAllOrdersByUserDomiciliarySaga() {
  try {
    const { data } = yield call(api.getAllOrdersByUserDomiciliary);
    yield put(getAllOrderDoneAction(data));
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
    yield put(createOrderDoneAction(data));
    yield put(push('/client/orderslist'));
  } catch (error) {
    yield put(errorCreateOrder('Error inesperado'));
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
    yield put(errorDeleteOrder('Error inesperado'));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

/*
 * Orders Product
 * Get All Order Product
 */
function* getAllOrderProductSaga() {
  try {
    const { data } = yield call(api.getAllOrdersProduct);
    if (data.length === 0) {
      yield put(getAllOrderProductErrorAction('Error hay datos'));
    } else {
      yield put(getAllOrderProductDoneAction(data));
    }
  } catch (error) {
    yield put(getAllOrderProductErrorAction('Error no esperado'));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* getAllOrderProductByUserSaga() {
  try {
    const { data } = yield call(api.getAllOrdersProductByUser);
    if (data.length === 0) {
      yield put(getAllOrderProductErrorAction('Error hay datos'));
    } else {
      yield put(getAllOrderProductDoneAction(data));
    }
  } catch (error) {
    yield put(getAllOrderProductErrorAction('Error no esperado'));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}
function* getAllOrderProductByIdUserSaga(action) {
  try {
    const { data } = yield call(
      api.getAllOrdersProductByIdUser,
      action.payload
    );
    if (Object.keys(data).length < 1) {
      yield put(getAllOrderProductErrorAction('Error hay datos'));
    } else {
      yield put(getOrderProductByOrderNumberDoneAction(data));
    }
  } catch (error) {
    yield put(getAllOrderProductErrorAction('Error no esperado'));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* getOrderProductByOrderNumberSaga(action) {
  try {
    const { data } = yield call(
      api.getOrderProductByOrderNumber,
      action.payload
    );
    if (!data) {
      yield put(getAllOrderProductErrorAction('Error hay datos'));
    } else {
      yield put(getOrderProductByOrderNumberDoneAction(data));
    }
  } catch (error) {
    yield put(getAllOrderProductErrorAction('Error no esperado'));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// Create Order Product
function* createOrderProductSaga(action) {
  try {
    const { data } = yield call(
      api.createOrderProduct,
      action.payload
    );
    yield put(createOrderProductDoneAction(data));
  } catch (error) {
    yield put(
      errorCreateOrderProduct(
        'Error while try to create the orderProduct'
      )
    );
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// Update Order Product
function* updateOrderProductSaga(action) {
  try {
    const { data } = yield call(
      api.updateOrderProduct,
      action.payload
    );
    yield put(updateOrderProductDoneAction(data));
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// Delete Order Product
function* deleteOrderProductSaga(action) {
  try {
    const { data } = yield call(
      api.deleteOrderProduct,
      action.payload
    );
    if (data.status === 200) {
      yield put(deleteOrderProductDoneAction(data));
    } else {
      yield put(errorDeleteOrderProduct(data.status));
    }
  } catch (error) {
    yield put(
      errorDeleteOrderProduct(
        'Error while try to delete the orderProduct'
      )
    );
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
      if (data.length > 0) {
        yield put(getSheetsOrderDoneAction(data));
      } else {
        yield put(getSheetsOrderErrorAction('No hay datos'));
      }
    } else {
      yield put(getSheetsOrderErrorAction('Error inesperado'));
    }
  } catch (error) {
    yield put(getSheetsOrderErrorAction('Error inesperado'));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// Update Sheets Orders
function* updateSheetsOrderSaga(action) {
  try {
    const { data } = yield call(action.payload);
    if (data) {
      //yield put(updateSheetOrderDoneAction(data));
    } else {
      console.error('You have many errors');
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

// Delete Sheets Orders
function* deleteSheetsOrderSaga(action) {
  try {
    const { data } = yield call(action.payload);
    if (data) {
      yield put(deleteSheesOrderDoneAction(data));
    } else {
      console.error('You have many errors');
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

export function* rootSaga() {
  yield takeLatest(loginAction.type, loginSaga);
  yield takeLatest(loginDoneAction.type, loginDoneSaga);
  yield takeLatest(
    actualizarUsuarioAction.type,
    actualizarUsuarioSaga
  );
  yield takeLatest(registerAction.type, registerSaga);

  yield takeLatest(
    restoreSessionStateAction.type,
    restoreSessionStateSaga
  );
  yield takeLatest(logoutAction.type, logoutSagas);

  // Client Location
  yield takeLatest(
    createPositionClientAction.type,
    createPositionClientSaga
  );
  yield takeLatest(
    getFromClientPositionAction.type,
    getFromClientPositionSaga
  );

  // Dealer Location
  yield takeLatest(
    createPositionDealerAction.type,
    createPositionDealerSaga
  );
  // yield takeLatest(
  //   updatePositionDealerAction.type,
  //   updatePositionDealerSaga
  // );
  yield takeLatest(
    getFromDealerPositionAction.type,
    getFromDealerPositionSaga
  );
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);

  // Users
  yield takeLatest(getAllUserAction.type, getAllUserSaga);
  yield takeLatest(getAllClientAction.type, getAllClientSaga);
  yield takeLatest(
    getAllDomiciliaryAction.type,
    getAllDomiciliarySaga
  );

  // Orders
  yield takeLatest(getAllOrderAction.type, getAllOrderSaga);
  yield takeLatest(getOrderByIdAction.type, getOrderByIdSaga);
  yield takeLatest(
    getAllOrderByUserAction.type,
    getAllOrderByUserSaga
  );
  yield takeLatest(
    getAllOrderByCompanyAction.type,
    getAllOrderByCompanySaga
  );

  yield takeLatest(
    getAllOrdersByUserDomiciliaryAction.type,
    getAllOrdersByUserDomiciliarySaga
  );
  yield takeLatest(createOrderAction.type, createOrderSaga);
  yield takeLatest(updateOrderAction.type, updateOrderSaga);
  yield takeLatest(deleteOrderAction.type, deleteOrderSaga);

  // Orders
  yield takeLatest(
    getAllOrderProductAction.type,
    getAllOrderProductSaga
  );
  yield takeLatest(
    getAllOrderProductByUserAction.type,
    getAllOrderProductByUserSaga
  );
  yield takeLatest(
    getAllOrderProductByIdUserAction.type,
    getAllOrderProductByIdUserSaga
  );
  yield takeLatest(
    getOrderProductByOrderNumberAction.type,
    getOrderProductByOrderNumberSaga
  );
  yield takeLatest(
    createOrderProductAction.type,
    createOrderProductSaga
  );
  yield takeLatest(
    updateOrderProductAction.type,
    updateOrderProductSaga
  );
  yield takeLatest(
    deleteOrderProductAction.type,
    deleteOrderProductSaga
  );

  // Sheets Orders
  yield takeLatest(getSheetsOrderAction.type, getSheetsOrderSaga);
  yield takeLatest(
    updateSheetOrderAction.type,
    updateSheetsOrderSaga
  );
  yield takeLatest(
    deleteSheetOrderAction.type,
    deleteSheetsOrderSaga
  );
}
