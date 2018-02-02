import './style.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

// Application components
import AuthContainer from './components/Authentication/AuthContainer';
import Portfolio from './components/Portfolio';
import Settings from './components/Settings';

import history from './history';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={AuthContainer} />
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </Router>
      </main>
    );
  }
}

export default App;