import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import user from '../reducers/user.js';
import portfolio from '../reducers/portfolio.js';

const rootReducer = combineReducers({
  user,
  portfolio
});

export default function configure(intitialState = {}) {
  const store = createStore(rootReducer, intitialState, applyMiddleware(thunkMiddleware, logger));
  return store;
};