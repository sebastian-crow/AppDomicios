import { createAction, createReducer } from "@reduxjs/toolkit";

// Handle exeption
export const createPositionAction = createAction(
  "CREATE_POSITION_ACTION",
);
export const createPositionDoneAction = createAction(
  "CREATE_POSITION_DONE_ACTION",
);
export const updatePositionAction = createAction(
  "UPDATE_POSITION_ACTION",
);
export const updatePositionDoneAction = createAction(
  "UPDATE_POSITION_DONE_ACTION",
);
export const getFromUserPositionAction = createAction(
  "GET_FROM_USER_POSITION_ACTION",
);
export const getFromUserPositionDoneAction = createAction(
  "GET_FROM_USER_POSITION_DONE_ACTION",
);
export const getAllUserAction = createAction(
  "GET_ALL_USER_ACTION",
);

export const getAllUserDoneAction = createAction(
  "GET_ALL_USER_DONE_ACTION",
);
export const getAllProductAction = createAction(
  "GET_ALL_PRODUCT_ACTION",
);
export const getAllProductDoneAction = createAction(
  "GET_ALL_PRODUCT_DONE_ACTION",
);


// UI state reducers
const initialState = {
  position: '{ "lat": 6.208376299999999, "lng": -75.5658174 }',
  positionId: null,
  users: [],
  products: [],
};

const uiReducer = createReducer(initialState, {
  [createPositionDoneAction]: (state, action) => {
    state.position = action.payload.data[0].position;
    state.positionId = action.payload.data[0]._id;
  },
  [updatePositionDoneAction]: (state, action) => {
    state.position = action.payload.data[0].position;
    state.positionId = action.payload.data[0]._id;
  },
  [getFromUserPositionDoneAction]: (state, action) => {
    state.position = action.payload.data[0].position;
    state.positionId = action.payload.data[0]._id;
  },
  [getAllUserDoneAction]: (state, action) => {
    state.users = action.payload.data.Users;
  },
  [getAllProductDoneAction]: (state, action) => {
    state.products = action.payload.data.Products;
  },
  
});

export default uiReducer;
