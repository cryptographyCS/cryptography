import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
          <input id="username" value={this.state.user} onChange={this.handleUser.bind(this)} type="text"  placeholder="username"/>
          <input id="password" value={this.state.password} onChange={this.handlePassword.bind(this)}type="password"  placeholder="password"/>
          <Link to='/portfolio'><button id='submit' type='submit'>submit</button></Link>
        </form>
      </div>
    );
  }
}

export default Login;
