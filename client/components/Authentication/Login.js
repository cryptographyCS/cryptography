import React, { Component } from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router';
import classNames from 'classnames';

// export here for testing connected component
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      loading: false,
      errors: {},
      username: '',
      password: '',
      success: false,
      location: 'login'
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Runs on change for each input to set state for current field
   * and set changed to true, preventing submit from enabling
   * 
   * @param {string} field - inputs ref prop
   */
  handleInputChange(field) {
    let value = this.refs[field].value;
    return (
      this.setState({ [field]: value, changed: true }, this.validateForm)
    );
  }

  /**
   * Checks each field onChange to populate errors 
   * object and display validation messages to user
   */
  validateForm() {
    const errors = {};
    if (!this.state.username) {
      errors.username = 'Username cannot be blank'
    }

    if (!this.state.password) {
      errors.password = 'Password cannot be blank'
    }

    this.setState({ errors });
  }

  /**
 * Disables form submit button if user is entering data 
 * in input fields, if the form is awaiting a response 
 * from the server, or if there are validation errors
 */
  isDisabled() {
    return (
      Boolean(!this.state.changed || this.state.loading || Object.keys(this.state.errors).length)
    );
  }

  /**
   * Handle keyPress to only allow enter key 
   * to submit form if it is no longer disabled
   * 
   * @param {object} event - keypress event
   */
  onKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!this.isDisabled()) {
        this.onSubmit();
      }
    }
  }

  /**
   * Sets loading state to true when form is submitted then fires
   * signInUser action. Once success is returned from server, sets 
   * loading to false and success to true to redirect to /portfolio
   */
  onSubmit() {
    this.setState({ loading: true }, () => {
      this.props.signInUser(this.state)
        .then(() => {
          this.setState({ loading: false, success: true });
        })
        .catch((err) => {
          console.log(`Authentication error: ${err}`);
          this.setState({ loading: false });
        });
    });
  }

  render() {
    const { errors } = this.state;
    // Redirect to /portfolio after successful authentication
    // better place to do this?
    // if (this.props.authenticated) {
    //   return <Redirect to="/portfolio" />
    // }
    return (
      <form className='login-form' onKeyPress={this.onKeyPress}>
        <div className={classNames({ 'has-error': errors.username })}>
          <input
            ref="username"
            className='username auth-input'
            onChange={() => this.handleInputChange('username')}
            type='text'
            placeholder='username'
          ></input>
          <span className={classNames('has-error', { 'show': errors.username })}>
            {errors.username}
          </span>
        </div>
        <div className={classNames({ 'has-error': errors.password })}>
          <input
            ref="password"
            className='password auth-input'
            onChange={() => this.handleInputChange('password')}
            type='password'
            placeholder='password'
          ></input>
          <span className={classNames('has-error', { 'show': errors.password })}>
            {errors.password}
          </span>
        </div>
        <button
          className="submit auth-input"
          type="submit"
          disabled={this.isDisabled()}
          onClick={this.onSubmit}
        >
          {this.state.loading ? 'Sending...' : 'Submit'}
        </button>
        {
          this.props.error.signin &&
          <div style={{ color: '#9F2738', marginBottom: '10px' }}><em>{this.props.error.signin}</em></div>
        }
      </form>
    );
  }
}

export default Login;
