import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
/*eslint-disable*/
const mapStateToProps = store => ({
  authenticated: store.user.authenticated,
  error: store.user.error
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    signInUser: actions.signInUser,
  }, dispatch)
};

// export here for testing connected component
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      registerUser: '',
      registerPassword: '',
      registerPassword2: '',
      email: '',
    };
  }

  handleUser() {
    this.setState({ user: event.target.value });
  }

  handlePassword() {
    this.setState({ password: event.target.value });
  }
  
  handleRegisterUser() {
    this.setState({ registerUser: event.target.value });
  }
  
  handleRegisterPassword() {
    this.setState({ registerPassword: event.target.value });
  }
  
  handleRegisterPassword2() {
    this.setState({ registerPassword2: event.target.value });
  }
  
  handleEmail() {
    this.setState({ email: event.target.value });
  }
  
  submitForm(event) {
    event.preventDeault();
  }

  render() {
    console.log(this.props);
    return (
      <div className='login-page'>
        <div id='title'>
          cryptography
        </div>
        <div id='description'>
          track your cryptocurrency portfolio in one place
        </div>
        <form className='login' onSubmit={this.submitForm}>
          <input id="username" value={this.state.user} onChange={this.handleUser.bind(this)} type="text"  placeholder="username"/>
          <input id="password" value={this.state.password} onChange={this.handlePassword.bind(this)} type="password"  placeholder="password"/>
          <Link to='/portfolio'><button id='submit' type='submit'>submit</button></Link>
          <Link to='/portfolio' id='forgot' >forgot password?</Link>
        </form>
        <div id='registration-section'>
          <hr/>
          <div>Register</div>
          <form className='registration-form' onSubmit={this.submitForm}>
            <input id="username" value={this.state.registerUser} onChange={this.handleRegisterUser.bind(this)} type="text"  placeholder="username"/>
            <input id="password" value={this.state.registerPassword} onChange={this.handleRegisterPassword.bind(this)} type="password"  placeholder="password"/>
            <input id="password" value={this.state.registerPassword2} onChange={this.handleRegisterPassword2.bind(this)} type="password"  placeholder="password"/>
            <input id="username" value={this.state.email} onChange={this.handleEmail.bind(this)}type="text"  placeholder="email"/>
            <Link to='/settings'><button id='submit' type='submit'>submit</button></Link>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
