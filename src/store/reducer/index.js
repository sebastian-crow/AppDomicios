import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from '../../components/counter/counterSlice';
import uiReducer from "./uiReducer";
import loginReducer from "./loginReducer";
import { sessionStateReducer } from "./sessionReducer";
export * from "./uiReducer";
export * from "./loginReducer";
export * from "./sessionReducer";
export * from "./createProductReducer"
export * from "./orderReducer"


export const createRootReducer = (routerReducer) => {
  // create root roducer
  const mainReducer = combineReducers({
    router: routerReducer,
    ui: uiReducer,
    login: loginReducer,
    counter: counterReducer
  });
  // create chain of reducers
  const reducerChain = [mainReducer, sessionStateReducer];
  // return a reducer which chains the mainReducer with sessionReducer.
  // Both need access to full state tree.
  return (state, action) =>
    reducerChain.reduce(
      (newState, reducer) => reducer(newState, action),
      state,
    );
};
