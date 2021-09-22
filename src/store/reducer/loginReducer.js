import { createAction, createReducer } from "@reduxjs/toolkit";

// Acciones de inicio de secion
export const loginAction = createAction("LOGIN_ACTION");
export const loginDoneAction = createAction("LOGIN_DONE_ACTION");
export const logoutAction = createAction("LOGOUT_ACION");
export const loginError = createAction("LOGIN_ERROR");

// Acciones de registro
export const registerAction = createAction("REGISTER_ACTION");
export const registerDoneAction = createAction("REGISTER_DONE_ACTION");
export const errorRegistro = createAction("ERROR_REGISTRO");

// Acciones de edicion de usuario
export const actualizarUsuarioAction = createAction(
  "ACTUALIZAR_USUARIO_ACTION",
);
export const actualizarUsuarioDoneAction = createAction(
  "ACTUALIZAR_USUARIO_DONE_ACTION",
);

// UI state reducers
const initialState = {
  usuario: {},
  errorInicio: "",
  errorRegistro: "",
};

const uiReducer = createReducer(initialState, {
  [loginDoneAction]: (state, action) => {
    state.usuario = action.payload.data;
  },
  [logoutAction]: (state, action) => {
    state.usuario = {};
  },
  [registerDoneAction]: (state, action) => {
    state.usuario = action.payload.data;
  },
  [actualizarUsuarioDoneAction]: (state, action) => {
    state.usuario.user = action.payload.data;
  },
  [loginError]: (state, action) => {
    state.errorInicio = action.payload;
  },
  [errorRegistro]: (state, action) => {
    state.errorRegistro = action.payload;
  },
});

export default uiReducer;
