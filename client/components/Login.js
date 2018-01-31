import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
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
      password: '',
      registerUser: '',
      registerPassword: '',
      registerPassword2: '',
      email: '',
    };
  }

  handleUser(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleRegisterUser(event) {
    this.setState({ registerUser: event.target.value });
  }

  handleRegisterPassword(event) {
    this.setState({ registerPassword: event.target.value });
  }

  handleRegisterPassword2(event) {
    this.setState({ registerPassword2: event.target.value });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  submitForm(event) {
    event.preventDeault();
  }

  render() {
    return (
      <Route exact path="/" render={() => (
        this.props.authenticated ? (
          <Redirect to="/portfolio" />
        ) : (
            <div className='login-page'>
              <img id='logo' src={require('./../img/coin.png')} alt=''/>
              <div id='title'>
                cryptography
              </div>
              <div className='login'>
                <input className='username' onChange={event => this.handleUser(event)} type="text" placeholder="username" />
                <input className='password' onChange={event => this.handlePassword(event)} type="password" placeholder="password" />
                <button className='submit' onClick={() => this.props.signInUser(this.state)}>log in</button>
                {
                  this.props.error.signin &&
                  <div style={{ color: '#9F2738' }}><em>{this.props.error.signin}</em></div>
                }
                <Link to='/portfolio' id='forgot' >forgot password?</Link>
              </div>
              <div id="line"> <hr/> </div>
              <div id='registration-section'>
                <div id='registration-form'>
                  <div id="registration-text">sign up to track your entire cryptocurrency portfolio in one place</div>
                  <input className='username' onChange={event => this.handleRegisterUser(event)} type="text"  placeholder="username"/>
                  <input className='password' onChange={event => this.handleRegisterPassword(event)} type="password"  placeholder="password"/>
                  <input className='password' onChange={event => this.handleRegisterPassword2(event)} type="password"  placeholder="password"/>
                  <input className='username' onChange={event => this.handleEmail(event)} type="text"  placeholder="email"/>
                  <br></br>
                  <button className='submit-sign-up' onClick={() => this.props.signUpUser(this.state)}>submit</button>
                        {
                          this.props.error.signup &&
                          <div style={{ color: '#9F2738' }}><em>{this.props.error.signin}</em></div>
                        }
                </div>
              </div>
            </div>
          )
      )} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
