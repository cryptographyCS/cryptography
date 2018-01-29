import React, { Component } from 'react';

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

  render() {
    return (
      <div>
        <input value={this.state.user} onChange={this.handleUser.bind(this)} type="text" />
        <input value={this.state.password} onChange={this.handlePassword.bind(this)}type="password" />
      </div>
    );
  }
}
export default Login;
