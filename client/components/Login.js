import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = store => ({
  userCounter: store.user.userCounter
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    increaseUserCounter: actions.increaseUserCounter,
    decreaseUserCounter: actions.decreaseUserCounter,
  }, dispatch)
};

// export here for testing connected component
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
    this.handleUser = this.handleUser.bind(this);
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
          <input id="username" value={this.state.user} onChange={this.handleUser} type="text" placeholder="username" />
          <input id="password" value={this.state.password} onChange={this.handlePassword.bind(this)} type="password" placeholder="password" />
          <Link to='/portfolio'><button id='submit' type='submit'>submit</button></Link>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
