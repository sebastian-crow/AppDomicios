import { createAction, createReducer } from "@reduxjs/toolkit";

// Handle exeption
export const createPositionAction = createAction("CREATE_POSITION_ACTION");
export const createPositionDoneAction = createAction(
  "CREATE_POSITION_DONE_ACTION",
);
export const updatePositionAction = createAction("UPDATE_POSITION_ACTION");
export const updatePositionDoneAction = createAction(
  "UPDATE_POSITION_DONE_ACTION",
);
export const getFromUserPositionAction = createAction(
  "GET_FROM_USER_POSITION_ACTION",
);
export const getFromUserPositionDoneAction = createAction(
  "GET_FROM_USER_POSITION_DONE_ACTION",
);
export const getAllUserAction = createAction("GET_ALL_USER_ACTION");

export const getAllUserDoneAction = createAction("GET_ALL_USER_DONE_ACTION");
export const getAllProductAction = createAction("GET_ALL_PRODUCT_ACTION");
export const getAllProductDoneAction = createAction(
  "GET_ALL_PRODUCT_DONE_ACTION",
);

// Clients
export const getAllClientAction = createAction("GET_ALL_CLIENT_ACTION");

export const getAllClientDoneAction = createAction(
  "GET_ALL_CLIENT_DONE_ACTION",
);

// Domiciliarios
export const getAllDomiciliarioAction = createAction(
  "GET_ALL_DOMICILIARIO_ACTION",
);

export const getAllDomiciliarioDoneAction = createAction(
  "GET_ALL_DOMICILIARIO_DONE_ACTION",
);

// Orders
export const getAllOrderAction = createAction("GET_ALL_ORDER_ACTION");

export const getAllOrderDoneAction = createAction("GET_ALL_ORDER_DONE_ACTION");

// Take the dealer's  and client's current location

// Client
export const createPositionClientAction = createAction(
  "CREATE_POSITION_CLIENT_ACTION",
);
export const createPositionClientDoneAction = createAction(
  "CREATE_POSITION_CLIENT_DONE_ACTION",
);
export const updatePositionClientAction = createAction(
  "UPDATE_POSITION_CLIENT_ACTION",
);
export const updatePositionClientDoneAction = createAction(
  "UPDATE_POSITION_CLIENT_DONE_ACTION",
);

export const getFromClientPositionAction = createAction(
  "GET_FROM_CLIENT_POSITION_ACTION",
);

export const getFromClientPositionDoneAction = createAction(
  "GET_FROM_CLIENT_POSITION_DONE_ACTION",
);

// Domiciliario
export const createPositionDomiciliarioAction = createAction(
  "CREATE_POSITION_DOMICILIARIO_ACTION",
);
export const createPositionDomiciliarioDoneAction = createAction(
  "CREATE_POSITION_DOMICILIARIO_DONE_ACTION",
);
export const updatePositionDomiciliarioAction = createAction(
  "UPDATE_POSITION_DOMICILIARIO_ACTION",
);
export const updatePositionDomiciliarioDoneAction = createAction(
  "UPDATE_POSITION_DOMICILIARIO_DONE_ACTION",
);

export const getFromDomiciliarioPositionAction = createAction(
  "GET_FROM_DOMICILIARIO_POSITION_ACTION",
);

export const getFromDomiciliarioPositionDoneAction = createAction(
  "GET_FROM_DOMICILIARIO_POSITION_DONE_ACTION",
);

// UI state reducers
const initialState = {
  position: '{ "lat": 6.208376299999999, "lng": -75.5658174 }',
  positionId: null,
  users: [],
  products: [],
  clients: [],
  domiciliarios: [],
  orders: [],
  positionDomiciliario: {
    location: '{ "lat": 6.208376299999999, "lng": -75.5658174 }',
    id: null,
  },
  positionClient: {
    location: '{ "lat": 6.208376299999999, "lng": -75.5658174 }',
    id: null,
  },
};

const uiReducer = createReducer(initialState, {
  [createPositionDoneAction]: (state, action) => {
    state.position = action.payload.data[0].position;
    state.positionId = action.payload.data[0]._id;
  },
  [createPositionClientDoneAction]: (state, action) => {
    state.positionClient.location = action.payload.data[0].position;
    state.positionClient.id = action.payload.data[0]._id;
  },

  [createPositionDomiciliarioDoneAction]: (state, action) => {
    state.positionDomiciliario.location = action.payload.data[0].position;
    state.positionDomiciliario.id = action.payload.data[0]._id;
  },

  [updatePositionDoneAction]: (state, action) => {
    state.position = action.payload.data[0].position;
    state.positionId = action.payload.data[0]._id;
  },
  [updatePositionClientDoneAction]: (state, action) => {
    state.positionClient.location = action.payload.data[0].position;
    state.positionClient.id = action.payload.data[0]._id;
  },

  [updatePositionDomiciliarioDoneAction]: (state, action) => {
    state.positionDomiciliario.location = action.payload.data[0].position;
    state.positionDomiciliario.id = action.payload.data[0]._id;
  },

  [getFromUserPositionDoneAction]: (state, action) => {
    state.position = action.payload.data[0].position;
    state.positionId = action.payload.data[0]._id;
  },
  [getFromClientPositionDoneAction]: (state, action) => {
    state.positionClient.location = action.payload.data[0].position;
    state.positionClient.id = action.payload.data[0]._id;
  },
  [getFromDomiciliarioPositionDoneAction]: (state, action) => {
    state.positionDomiciliario.location = action.payload.data[0].position;
    state.positionDomiciliario.id = action.payload.data[0]._id;
  },
  [getAllUserDoneAction]: (state, action) => {
    state.users = action.payload.data.Users;
  },
  [getAllProductDoneAction]: (state, action) => {
    state.products = action.payload.data.Products;
  },
  [getAllClientDoneAction]: (state, action) => {
    state.clients = action.payload.data.Clients;
  },
  [getAllDomiciliarioDoneAction]: (state, action) => {
    state.domiciliarios = action.payload.data.Domiciliarios;
  },
  [getAllOrderDoneAction]: (state, action) => {
    state.orders = action.payload.data.Orders;
  },
});

export default uiReducer;
