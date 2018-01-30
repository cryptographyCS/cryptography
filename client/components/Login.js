import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = store => ({
  authenticated: store.user.authenticated,
  error: store.user.error
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    signInUser: actions.signInUser,
  }, dispatch)
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
  }

  handleUser() {
    this.setState({ user: event.target.value });
  }

  handlePassword() {
    this.setState({ password: event.target.value });
  }

  submitForm(event) {
    event.preventDeault();
  }

  render() {
    console.log(this.props);
    return (
      <div className='login-page'>
        <div>
          <Link to='/portfolio'><button id='register'>register</button></Link>
        </div>
        <div id='title'>
          cryptography
        </div>
        <div id='description'>
          track your cryptocurrency portfolio in one place
        </div>
        <form className='login' onSubmit={this.submitForm}>
          <input id="username" value={this.state.user} onChange={this.handleUser.bind(this)} type="text" placeholder="username" />
          <input id="password" value={this.state.password} onChange={this.handlePassword.bind(this)} type="password" placeholder="password" />
          <Link to='/portfolio'><button id='submit' type='submit'>submit</button></Link>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
