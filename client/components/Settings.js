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
    addExchange: actions.addExchange,
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
          <p>  To include coins from an exchange, click the exchange to authorize Cryptography.</p> 
        </div>
        <div id='settings-images'>
          <a href='/coinbase/auth' target="_blank"><img className='logo-img' src={require('./../img/coinbase.png')} alt='Coinbase' /></a>
          
          <img onClick={this.togglePopup.bind(this, 'Poloniex')} className='logo-img' src={require('./../img/poloniex.png')} alt='Poloniex' />
          {this.state.Poloniex ? <APIForm addExchange={this.props.addExchange} exchange='Poloniex' url={'https://poloniex.com/'} closePopup={this.togglePopup.bind(this)}/> : null}
          
          <img onClick={this.togglePopup.bind(this, 'Binance')} className='logo-img' src={require('./../img/binance.png')} alt='Binance' />
          {this.state.Binance ? <APIForm addExchange={this.props.addExchange} exchange='Binance' url={'https://www.binance.com/'} closePopup={this.togglePopup.bind(this)}/> : null}
          
          <img onClick={this.togglePopup.bind(this, 'Yobit')} className='logo-img' src={require('./../img/yobit.png')} alt='Yobit' />
          {this.state.Yobit ? <APIForm addExchange={this.props.addExchange} exchange='Yobit' url={'https://yobit.net/en/'} closePopup={this.togglePopup.bind(this)}/> : null}
          
          <img onClick={this.togglePopup.bind(this, 'Kraken')} className='logo-img' src={require('./../img/kraken.png')} alt='Kraken' />
          {this.state.Kraken ? <APIForm addExchange={this.props.addExchange} exchange='Kraken' url={'https://www.kraken.com/'} closePopup={this.togglePopup.bind(this)}/> : null}
          
          <img onClick={this.togglePopup.bind(this, 'Kucoin')} className='logo-img' src={require('./../img/kucoin.png')} alt='Kucoin' />
          {this.state.Kucoin ? <APIForm addExchange={this.props.addExchange} exchange='Kucoin' url={'https://www.kucoin.com/#/'} closePopup={this.togglePopup.bind(this)}/> : null}
          
          <img onClick={this.togglePopup.bind(this, 'Cryptopia')} className='logo-img' src={require('./../img/cryptopia.png')} alt='Cryptopia' />
          {this.state.Cryptopia ? <APIForm addExchange={this.props.addExchange} exchange='Cryptopia' url={'https://www.cryptopia.co.nz/'} closePopup={this.togglePopup.bind(this)}/> : null}
          
          <img onClick={this.togglePopup.bind(this, 'Coinhouse')} className='logo-img' src={require('./../img/coinhouse.png')} alt='Coinhouse' />
          {this.state.Coinhouse ? <APIForm addExchange={this.props.addExchange} exchange='Coinhouse' url={'http://coinhouse.eu/'} closePopup={this.togglePopup.bind(this)}/> : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

