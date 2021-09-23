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

export function* rootSaga() {
  yield takeLatest(loginAction.type, loginSaga);
  yield takeLatest(loginDoneAction.type, loginDoneSaga);
  yield takeLatest(actualizarUsuarioAction.type, actualizarUsuarioSaga);
  yield takeLatest(registerAction.type, registerSaga);
  yield takeLatest(createPositionAction.type, createPositionSaga);
  yield takeLatest(updatePositionAction.type, updatePositionSaga);
  yield takeLatest(getFromUserPositionAction.type, getFromUserPositionSaga);
  yield takeLatest(getAllUserAction.type, getAllUserSaga);
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);
}
