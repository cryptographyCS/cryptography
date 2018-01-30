import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
    };
  }

  handleUser() {
    this.setState({ username: event.target.value });
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
        <div className='login'>
          <input id="username" value={this.state.username} onChange={this.handleUser.bind(this)} type="text" placeholder="username" />
          <input id="password" value={this.state.password} onChange={this.handlePassword.bind(this)} type="password" placeholder="password" />
          <button id='submit' onClick={() => this.props.signUpUser(this.state)}>submit</button>
          {/* <Link to='/portfolio'><button id='submit' type='submit' onClick={() => this.props.signUpUser(this.state)}>submit</button></Link>
          <Link to='/portfolio' id='forgot' >forgot password?</Link> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
