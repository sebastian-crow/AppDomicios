import { createAction, createReducer } from "@reduxjs/toolkit";

// Handle exeption

// Client Position
export const createPositionClientAction = createAction(
  "CREATE_POSITION_CLIENT_ACTION",
);
export const createPositionClientDoneAction = createAction(
  "CREATE_POSITION_CLIENT_DONE_ACTION",
);
export const saveMyPositionClientAction = createAction(
  "SAVE_MY_POSITION_CLIENT_ACTION",
);

export const getFromClientPositionAction = createAction(
  "GET_FROM_CLIENT_POSITION_ACTION",
);
export const getFromClientPositionDoneAction = createAction(
  "GET_FROM_CLIENT_POSITION_DONE_ACTION",
);

// Dealer Position
export const createPositionDealerAction = createAction(
  "CREATE_POSITION_DEALER_ACTION",
);
export const createPositionDealerDoneAction = createAction(
  "CREATE_POSITION_DEALER_DONE_ACTION",
);
export const updatePositionDealerAction = createAction(
  "UPDATE_POSITION_DEALER_ACTION",
);
export const updatePositionDealerDoneAction = createAction(
  "UPDATE_POSITION_DEALER_DONE_ACTION",
);
export const getFromDealerPositionAction = createAction(
  "GET_FROM_DEALER_POSITION_ACTION",
);
export const getFromDealerPositionDoneAction = createAction(
  "GET_FROM_DEALER_POSITION_DONE_ACTION",
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

// Domiciliarys
export const getAllDomiciliaryAction = createAction(
  "GET_ALL_DOMICILIARIO_ACTION",
);

export const getAllDomiciliaryDoneAction = createAction(
  "GET_ALL_DOMICILIARIO_DONE_ACTION",
);

// Orders
export const getAllOrderAction = createAction("GET_ALL_ORDER_ACTION");

export const getAllOrderDoneAction = createAction("GET_ALL_ORDER_DONE_ACTION");

// Get Sheets Orders
export const getSheetsOrderAction = createAction("GET_SHEETS_ORDER_ACTION");
export const getSheetsOrderDoneAction = createAction(
  "GET_SHEETS_ORDER_DONE_ACTION",
);

// UI state reducers
const initialState = {
  position: {
    client: { lat: 6.208376299999999, lng: -75.5658174 },
    dealer: { lat: 6.208376299999999, lng: -75.5658174 },
  },
  users: [],
  products: [],
  clients: [],
  domiciliarys: [],
  orders: [],
  sheetsOrder: [],
};

const uiReducer = createReducer(initialState, {
  // Create Position Client
  [createPositionClientDoneAction]: (state, action) => {
    state.position.client.positionClient = action.payload.data[0].position;
    state.position.client.positionClientId = action.payload.data[0]._id;
  },

  // Create Position Dealer
  [createPositionDealerDoneAction]: (state, action) => {
    state.position.dealer.positionDealer = action.payload.data[0].position;
    state.position.dealer.positionDealerId = action.payload.data[0]._id;
  },

  // Update Position Client
  [saveMyPositionClientAction]: (state, action) => {
    state.position.client = action.payload;
  },

  // Update Position Dealer
  [updatePositionDealerDoneAction]: (state, action) => {
    state.position.dealer.positionDealer = action.payload.data[0].position;
    state.position.dealer.positionDealerId = action.payload.data[0]._id;
  },

  // Get Position Client
  [getFromClientPositionDoneAction]: (state, action) => {
    state.position.client.positionClient = action.payload.data[0].position;
    state.position.client.positionClientId = action.payload.data[0]._id;
  },

  // Get Position Dealer
  [getFromDealerPositionDoneAction]: (state, action) => {
    state.position.dealer.positionDealerId = action.payload.data[0].position;
    state.position.dealer.positionDealerId = action.payload.data[0]._id;
  },

  // Get ALl Users
  [getAllUserDoneAction]: (state, action) => {
    state.users = action.payload.data.Users;
  },

  // Get All Clients
  [getAllClientDoneAction]: (state, action) => {
    state.clients = action.payload;
  },

  // Get All Domiciliarys
  [getAllDomiciliaryDoneAction]: (state, action) => {
    state.domiciliarys = action.payload;
  },

  // Get All Orders
  [getAllOrderDoneAction]: (state, action) => {
    state.orders = action.payload;
  },
  // Get All Google Sheets by User
  [getSheetsOrderDoneAction]: (state, action) => {
    state.sheetsOrder = action.payload;
  },
});

export default uiReducer;
