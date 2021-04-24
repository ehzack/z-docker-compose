import { applyMiddleware, createStore } from "redux";
import rootReducer from "./index";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "remote-redux-devtools";

let store;

export function configureStore(preloadedState) {
  store = createStore(rootReducer, applyMiddleware(thunk));

  return store;
}

export function getStore() {
  return store;
}
