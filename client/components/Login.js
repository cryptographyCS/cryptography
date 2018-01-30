import React, { Component } from 'react';
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
        <input value={this.state.password} onChange={this.handlePassword.bind(this)} type="password" />
        <section>
          <div>User Counter: {this.props.userCounter}</div>
          <button onClick={() => this.props.increaseUserCounter()}>Increase Counter</button>
          <button onClick={() => this.props.decreaseUserCounter()}>Decrease Counter</button>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
