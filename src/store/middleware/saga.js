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
} from '../reducer';

import { LOCATION_CHANGE } from 'redux-first-history';

function* loginSaga(action) {
  try {
    const { data } = yield call(api.login, action.payload);
    if (data) {
      var webPush = localStorage.getItem('webpush');
      var webPush = JSON.parse(webPush);
      console.log(webPush);
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
    yield put(getAllOrderProductAction());
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
    } else {
      yield put(push('/'));
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
    localStorage.removeItem('formURL');
    localStorage.removeItem('authURL');
    localStorage.removeItem('defaultRedirectURL');
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
    yield put(registerDoneAction(data));
    yield put(push('/'));
  } catch (error) {
    yield put(errorRegistro(error));
  } finally {
    if (yield cancelled()) {
      // Do nothing
    }
  }
}

function* locationChangeSaga(action) {
  const user = yield select((state) => state.login.user);
  if (user) {
    const pathname = action.payload.location.pathname;
    const formURL = localStorage.getItem('formURL');
    const authURL = localStorage.getItem('authURL');
    const defaultRedirectURL = localStorage.getItem(
      'defaultRedirectURL'
    );
    // const orderProduct = yield select((state) =>
    //   state.ui.ordersProduct.filter(
    //     (order) => order.userPlatform === user.id
    //   )
    // );
    if (pathname === '/') {
      switch (user.rol) {
        case 'client':
          yield put(push('/client/orderProducts'));
          const defaultRedirectURL = window.location.href;
          const previousURL = localStorage.getItem(
            'defaultRedirectURL'
          );
          if (!previousURL)
            localStorage.setItem(
              'defaultRedirectURL',
              defaultRedirectURL
            );
          if (defaultRedirectURL && authURL && formURL) {
            yield put(push('/client/takeorder/2/5/Datodeusuario'));
          }
          // if (
          //   formURL !==
          //   `${REACT_APP_REACT_HOST}/${orderProduct[0]?.linkToOrder}`
          // )
          //   localStorage.removeItem('formURL');

          // if (
          //   defaultRedirectURL &&
          //   authURL &&
          //   formURL === orderProduct[0]?.linkToOrder
          // ) {
          //   yield put(push(orderProduct[0]?.linkToOrder));
          // }

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

// function* updatePositionDealerSaga(action) {
//   try {
//     const { data } = yield call(api.updatePosition, action.payload);
//     if (data.status === 200) {
//       yield put(updatePositionDealerDoneAction(data));
//     } else {
//       yield put(loginError(data.message));
//     }
//   } catch (error) {
//   } finally {
//     if (yield cancelled()) {
//       // Do nothing
//     }
//   }
// }

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

function* createOrderSaga(action) {
  try {
    const { data } = yield call(api.createOrder, action.payload);
    yield put(createOrderDoneAction(data));
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
    yield put(getAllOrderProductDoneAction(data));
  } catch (error) {
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
      yield put(getSheetsOrderDoneAction(data));
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

// Update Sheets Orders
function* updateSheetsOrderSaga(action) {
  try {
    const { data } = yield call(action.payload);
    console.log('What is that?', data);
    if (data) {
      //yield put(updateSheetOrderDoneAction(data));
      console.log(
        'this is your data when you try to update this',
        data
      );
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
      console.log('This happended when you try to delete this', data);
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

  yield takeEvery(
    restoreSessionStateAction.type,
    restoreSessionStateSaga
  );
  yield takeEvery(logoutAction.type, logoutSagas);

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
  yield takeLatest(createOrderAction.type, createOrderSaga);
  yield takeLatest(updateOrderAction.type, updateOrderSaga);
  yield takeLatest(deleteOrderAction.type, deleteOrderSaga);

  // Orders
  yield takeLatest(
    getAllOrderProductAction.type,
    getAllOrderProductSaga
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
