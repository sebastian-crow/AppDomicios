import { takeLatest, put, call, cancelled } from "redux-saga/effects";

import { api } from "./api";
import {
  loginAction,
  loginDoneAction,
  buscarRestaurantesAction,
  buscarRestaurantesDoneAction,
  saveSessionStateAction,
  registerAction,
  registerDoneAction,
  errorRegistro,
  actualizarUsuarioAction,
  actualizarUsuarioDoneAction,
  listarHistorialBusquedasAction,
  listarHistorialBusquedasDoneAction,
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

function* buscarRestaurantesSagas(action) {
  try {
    if (action.payload.value) {
      const { data } = yield call(api.restaurantes, action.payload);
      //console.log(data);
      let cacheMarkers = [];
      data.data.results.forEach((restaurante) => {
        cacheMarkers.push(restaurante.geometry.location);
      });
      yield put(buscarRestaurantesDoneAction(cacheMarkers));
    }
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

function* listarHistorialBusquedasSaga() {
  try {
    const { data } = yield call(api.listarHistorial);
    yield put(listarHistorialBusquedasDoneAction(data));
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
  yield takeLatest(buscarRestaurantesAction.type, buscarRestaurantesSagas);
  yield takeLatest(registerAction.type, registerSaga);
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);
  yield takeLatest(
    listarHistorialBusquedasAction.type,
    listarHistorialBusquedasSaga,
  );
}
