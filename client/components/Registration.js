import React, { Component } from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      loading: false,
      errors: {},
      username: '',
      password: '',
      passwordMatch: '',
      email: '',
      success: false
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

    if (!this.state.passwordMatch) {
      errors.passwordMatch = 'Please re-enter your password'
    }

    if (this.state.password !== this.state.passwordMatch) {
      errors.invalidPasswordMatch = 'Your password do not match'
    }

    if (!/\w@\w+[\.][A-Za-z]{2,4}$/.test(this.state.email)) {
      errors.email = 'Invalid email'
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
   * signUpUser action. Once success is returned from server, sets 
   * loading to false and success to true to hide registration form
   */
  onSubmit() {
    this.setState({ loading: true }, () => {
      this.props.signUpUser(this.state)
        .then(() => {
          this.setState({ loading: false, success: true });
          this.props.signInUser(this.state)
        })
        .catch((err) => {
          console.log(`Registration error: ${err}`);
          this.setState({ loading: false });
        });
    });
  }

  render() {
    const { errors } = this.state;
    // Redirect to /settings after successful registration
    // better place to do this?
    if (this.state.success) {
      return <Redirect to="/settings" />
    }
    return (
      <form className="registration-form" onKeyPress={this.onKeyPress}>
        <div>
          <input
            ref="username"
            className="username"
            type="text"
            placeholder="Username"
            onChange={() => this.handleInputChange('username')}
          ></input>
          <span>
            {errors.username}
          </span>
        </div>
        <div>
          <input
            ref="password"
            className="password"
            type="password"
            placeholder="Password"
            onChange={() => this.handleInputChange('password')}
          ></input>
          <span>
            {errors.password}
          </span>
        </div>
        <div>
          <input
            ref="passwordMatch"
            className="password"
            type="password"
            placeholder="Confirm Password"
            onChange={() => this.handleInputChange('passwordMatch')}
          ></input>
          <span>
            {errors.passwordMatch}
          </span>
          <span>
            {errors.invalidPasswordMatch}
          </span>
        </div>
        <div>
          <input
            ref="email"
            className="email"
            type="email"
            placeholder="Email Address"
            onChange={() => this.handleInputChange('email')}
          ></input>
          <span>
            {errors.email}
          </span>
        </div>
        <div>
          <button
            className="submit"
            type="submit"
            disabled={this.isDisabled()}
            onClick={this.onSubmit}
          >
            {this.state.loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
        {
          this.props.error.signup &&
          <div style={{ color: "#9F2738" }}><em>{this.props.error.signin}</em></div>
        }
      </form>
    );
  }
}

export default Registration;
