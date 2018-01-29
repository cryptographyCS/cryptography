import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import userReducer from '../reducers/user.js';
import portfolioReducer from '../reducers/portfolio.js';

const rootReducer = combineReducers({
  userReducer,
  portfolioReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

export default store;