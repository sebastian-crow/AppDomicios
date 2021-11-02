// store current state in local session store which can be restored
// on page reload.
import { createAction, createReducer } from "@reduxjs/toolkit";
import { LOCATION_CHANGE } from "redux-first-history";
export const restoreSessionStateAction = createAction("SESSION_RESTORE_STATE");
export const saveSessionStateAction = createAction("SESSION_SAVE_STATE");

function saveUiState(state) {
  const store = window.sessionStorage;
  const data = {
    ui: state.ui,
    login: state.login,
  };
  try {
    store.setItem("store", JSON.stringify(data));
  } catch (err) {
    // console.error("Unable to store state", err);
  }
}

function loadUiState(state) {
  const store = window.sessionStorage;
  try {
    const data = JSON.parse(store.getItem("store"));
    if (data) {
      state.ui = data.ui;
      state.login = data.login;
      store.removeItem("store");
    }
  } catch (err) {
    // console.error("Unable to restore state", err);
  }
}

export const sessionStateReducer = createReducer(
  {},
  {
    [restoreSessionStateAction]: (state) => {
      loadUiState(state);
    },
    [saveSessionStateAction]: (state) => {
      saveUiState(state);
    },
    [LOCATION_CHANGE]: () => {},
  },
);
