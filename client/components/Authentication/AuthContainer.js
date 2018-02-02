import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// Application Components
import Registration from './Registration';
import Login from './Login';

// Assets
const logo = require('./../../img/coin.png');

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
export class AuthContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='login-page'>
        <img id='logo' src={logo} alt='' />
        <div id='title'>
          cryptography
        </div>
        <div className='login'>
          <Login
            signInUser={this.props.signInUser}
            signIn={this.props.signIn}
            authenticated={this.props.authenticated}
            error={this.props.error}
          />
          <Link to='/portfolio' id='forgot' >forgot password?</Link>
        </div>
        <div id='line'> <hr /> </div>
        <div id='registration-section'>
          <div id="registration-text"> Sign up to track your entire crypto portfolio in one place. </div>
          <Registration
            signUpUser={this.props.signUpUser}
            signInUser={this.props.signInUser}
            signIn={this.props.signIn}
            error={this.props.error}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
