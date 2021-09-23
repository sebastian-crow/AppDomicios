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

// UI state reducers
const initialState = {
  position: '{ "lat": 6.208376299999999, "lng": -75.5658174 }',
  positionId: null,
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
});

export default uiReducer;
