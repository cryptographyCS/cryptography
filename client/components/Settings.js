import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import APIForm from './APIForm';
/*eslint-disable*/

const mapStateToProps = store => ({
  authenticated: store.user.authenticated,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    signOutUser: actions.signOutUser,
  }, dispatch)
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  togglePopup(exchange) {
    this.setState((prevState) => {
      if (prevState[exchange]) {
        return {[exchange]: !prevState[exchange]};
      }
      return {[exchange]: true};
    });
  }
  
  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/" />
    }
    return (
      <div className='app'>
        <button id='logout' onClick={() => this.props.signOutUser(this.props)}>Log Out</button>
        <Link className='header-navigate' to='/portfolio'>Portfolio</Link>
        <div id='settings-intro'>
          <p> Cryptography creates an aggregate view of your cryptocurrency portfolio.</p>
          <p>  To include coins from an exchange, click the exchange to authorize Cryptography.</p> <p> Cryptography has only read-access to your account; it cannot make buys or sells on your behalf. </p>
        </div>
        <div id='settings-images'>
          <a href='/coinbase/auth' target="_blank"><img className='logo-img' src={require('./../img/coinbase.png')} alt='Coinbase' /></a>
          <a href='https://poloniex.com/'><img className='logo-img' src={require('./../img/poloniex.png')} alt='Poloniex' /></a>
          
          <img onClick={this.togglePopup.bind(this, 'Binance')} className='logo-img' src={require('./../img/binance.png')} alt='Binance' />
          {this.state.Binance ? <APIForm exchange='Binance' url={'https://www.binance.com/'} closePopup={this.togglePopup.bind(this)}/> : null}
          
          <a href='https://yobit.net/en/'><img className='logo-img' src={require('./../img/yobit.png')} alt='Yobit' /></a>
          <a href='https://www.kraken.com/'><img className='logo-img' src={require('./../img/kraken.png')} alt='Kraken' /></a>
          <a href='https://www.kucoin.com/'><img className='logo-img' src={require('./../img/kucoin.png')} alt='KuCoin' /></a>
          <a href='https://www.cryptopia.co.nz/'><img className='logo-img' src={require('./../img/cryptopia.png')} alt='Cryptopia' /></a>
          <a href='http://coinhouse.eu/'><img className='logo-img' src={require('./../img/coinhouse.png')} alt='CoinHouse' /></a>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

