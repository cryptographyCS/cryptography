import React from 'react';
import { render } from 'react-dom';
import { Provder } from 'react-redux';
import store from './store';
import App from './App';


render(
  <Provder store={store}>
    <App />
  </Provder>,
  document.getElementById('root'));

