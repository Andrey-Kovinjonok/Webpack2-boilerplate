import { createStore, applyMiddleware, combineReducers } from 'redux';
import CatchPromise from 'redux-catch-promise';

import reducers from './reducers';

const thunkMiddleware = CatchPromise();

export default function createApiClientStore(initialState) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunkMiddleware),
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers');
      store.replaceReducer(nextReducers);
    });
  }

  return store;
}
