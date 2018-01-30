import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Portfolio from './components/Portfolio';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/portfolio' component={Portfolio}/>
          {/* <Route path='/settings' component={Settings}/> */}
        </Switch>
      </main>
    );
  }
}

export default App;
