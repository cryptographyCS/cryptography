import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const initializeStore = store();

render(
  <Provider store={initializeStore}>
    <App />
  </Provider>,
  document.getElementById('root'));

