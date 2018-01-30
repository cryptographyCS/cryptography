import React, { Component } from 'react';
import { render } from 'react-dom';
import Login from './components/Login';
import Portfolio from './components/Portfolio';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="app">
        <Login />
        <Portfolio />
      </div>
    );
  }
}

export default App;
