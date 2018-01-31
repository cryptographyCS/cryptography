import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Application Components
import Registration from './Registration';

/*eslint-disable*/
const mapStateToProps = store => ({
  authenticated: store.user.authenticated,
  signup: store.user.signup,
  error: store.user.error
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    signInUser: actions.signInUser,
    signUpUser: actions.signUpUser,
  }, dispatch)
};

// export here for testing connected component
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUser(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }


  render() {
    return (
      <Route exact path='/' render={() => (
        this.props.authenticated ? (
          <Redirect to='/portfolio' />
        ) : (
            <div className='login-page'>
              <img id='logo' src={require('./../img/coin.png')} alt='' />
              <div id='title'>
                cryptography
              </div>
              <div className='login'>
                <input className='username' onChange={event => this.handleUser(event)} type='text' placeholder='username' />
                <input className='password' onChange={event => this.handlePassword(event)} type='password' placeholder='password' />
                <button className='submit' onClick={() => this.props.signInUser(this.state)}>log in</button>
                {
                  this.props.error.signin &&
                  <div style={{ color: '#9F2738' }}><em>{this.props.error.signin}</em></div>
                }
                <Link to='/portfolio' id='forgot' >forgot password?</Link>
              </div>
              <div id='line'> <hr /> </div>
              <div id='registration-section'>
                <hr />
                <div>Register</div>
                <Registration signUpUser={this.props.signUpUser} signIn={this.props.signIn} error={this.props.error} />
              </div>
            </div>
          )
      )} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
