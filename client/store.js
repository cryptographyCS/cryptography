import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
// import reducers from './reducers/reducers.js';

const loggerMiddleware = createLogger();

const store = createStore(
  // reducers, 
  composeWithDevTools(),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);

export default store;
