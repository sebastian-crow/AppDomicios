import { createAction, createReducer } from "@reduxjs/toolkit";

// Handle exeption
export const buscarRestaurantesAction = createAction(
  "BUSCAR_RESTAURANTES_ACTION",
);
export const buscarRestaurantesDoneAction = createAction(
  "BUSCAR_RESTAURANTES_DONE_ACTION",
);

export const listarHistorialBusquedasAction = createAction(
  "LISTAR_HISTORIAL_BUSQUEDAS_ACTION",
);

export const listarHistorialBusquedasDoneAction = createAction(
  "LISTAR_HISTORIAL_BUSQUEDAS_DONE_ACTION",
);

// UI state reducers
const initialState = {
  ubicacionesRestaurantes: [],
  ciudad: "",
  historial: [],
};

const uiReducer = createReducer(initialState, {
  [buscarRestaurantesAction]: (state, action) => {
    if (action.payload.value) {
      state.ciudad = action.payload;
    } else {
      state.ubicacionesRestaurantes = [];
    }
  },
  [buscarRestaurantesDoneAction]: (state, action) => {
    state.ubicacionesRestaurantes = action.payload;
  },
  [listarHistorialBusquedasDoneAction]: (state, action) => {
    state.historial = action.payload.data.busquedas;
  },
});

export default uiReducer;
