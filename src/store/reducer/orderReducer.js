import { createAction, createReducer } from "@reduxjs/toolkit";

// Create Actions
export const createOrderAction = createAction("CREATE_ORDER_ACTION");
export const createOrderDoneAction = createAction("CREATE_ORDER_DONE_ACTION");
export const errorCreateOrder = createAction("ERROR_CREATE_ORDER");
export const errorGetOrders = createAction("ERROR_GET_ORDER");

// Update order actions
export const updateOrderAction = createAction("UPDATE_ORDER_ACTION");
export const updateOrderDoneAction = createAction("UPDATE_ORDER_DONE_ACTION");
export const errorUpdateOrder = createAction("ERROR_UPDATE_ORDER");

// Delete order actions
export const deleteOrderAction = createAction("DELETE_ORDER_ACTION");
export const deleteOrderDoneAction = createAction("DELETE_ORDER_DONE_ACTION");
export const errorDeleteOrder = createAction("ERROR_DELETE_ORDER");

// UI state reducers
const initialState = {
  order: {},
  errorCreate: "",
  errorUpdate: "",
  errorDelete: "",
};

const uiReducer = createReducer(initialState, {
  [createOrderAction]: (state, action) => {
    state.order = action.payload.data;
  },
  [createOrderDoneAction]: (state, action) => {
    state.order = action.payload.data;
  },
  [deleteOrderAction]: (state, action) => {
    state.order = {};
  },
  [deleteOrderDoneAction]: (state, action) => {
    state.order.order = {};
  },
  [updateOrderDoneAction]: (state, action) => {
    state.order.order = action.payload.data;
  },
  [errorCreateOrder]: (state, action) => {
    state.errorCreate = action.payload;
  },
  [errorUpdateOrder]: (state, action) => {
    state.errorUpdate = action.payload;
  },
  [errorDeleteOrder]: (state, action) => {
    state.errorDelete = action.payload;
  },
});

export default uiReducer;
