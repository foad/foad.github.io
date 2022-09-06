import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers/reducers';

const reducer = combineReducers(reducers);
let devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  devtools = a => a;
}

export const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), devtools)
);
