import { applyMiddleware, createStore } from 'redux';
import rootReducer from './index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

let store;

export function configureStore(preloadedState) {
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

  return store;
}

export function getStore() {
  return store;
}
