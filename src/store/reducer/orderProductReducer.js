import { createAction, createReducer } from '@reduxjs/toolkit';

// Create Actions
export const createOrderProductAction = createAction(
  'CREATE_ORDER_PRODUCT_ACTION'
);
export const createOrderProductDoneAction = createAction(
  'CREATE_ORDER_PRODUCT_DONE_ACTION'
);
export const errorCreateOrderProduct = createAction(
  'ERROR_CREATE_ORDER_PRODUCT'
);
export const errorGetOrdersProduct = createAction(
  'ERROR_GET_ORDER_PRODUCT'
);

// Update order actions
export const updateOrderProductAction = createAction(
  'UPDATE_ORDER_PRODUCT_ACTION'
);
export const updateOrderProductDoneAction = createAction(
  'UPDATE_ORDER_PRODUCT_DONE_ACTION'
);
export const errorUpdateOrderProduct = createAction(
  'ERROR_UPDATE_ORDER_PRODUCT'
);

// Delete order actions
export const deleteOrderProductAction = createAction(
  'DELETE_ORDER_PRODUCT_ACTION'
);
export const deleteOrderProductDoneAction = createAction(
  'DELETE_ORDER_PRODUCT_DONE_ACTION'
);
export const errorDeleteOrderProduct = createAction(
  'ERROR_DELETE_ORDER_PRODUCT'
);

// UI state reducers
const initialState = {
  orderProduct: {},
  errorCreate: '',
  errorUpdate: '',
  errorDelete: '',
};

const uiReducer = createReducer(initialState, {
  [createOrderProductDoneAction]: (state, action) => {
    state.orderProduct = action.payload;
  },
  [deleteOrderProductAction]: (state, action) => {
    state.orderProduct = {};
  },
  [deleteOrderProductDoneAction]: (state, action) => {
    state.orderProduct.orderProduct = {};
  },
  [updateOrderProductDoneAction]: (state, action) => {
    state.orderProduct.orderProduct = action.payload.data;
  },
  [errorCreateOrderProduct]: (state, action) => {
    state.errorCreate = action.payload;
  },
  [errorUpdateOrderProduct]: (state, action) => {
    state.errorUpdate = action.payload;
  },
  [errorDeleteOrderProduct]: (state, action) => {
    state.errorDelete = action.payload;
  },
});

export default uiReducer;
