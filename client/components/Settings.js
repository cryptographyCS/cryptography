import React, { Component } from 'react';
import { Link } from 'react-router-dom'
/*eslint-disable*/
class Settings extends Component {
  render() {
    return (
      <div>
        <Link to='/'><button id='logout'>Log Out</button></Link>
        <Link className='header-navigate' to='/portfolio'>Portfolio</Link>
        <div id="settings-intro">
          <p> Cryptography creates an aggregate view of your cryptocurrency portfolio.</p>
          <p>  To include coins from an exchange, click the exchange to authorize Cryptography.</p> <p> Cryptography has only read-access to your account; it cannot make buys or sells on your behalf. </p>
        </div>
        <div id="settings-images">
          <a href="/coinbase/auth"><img className='logo-img' src= {require('./../img/coinbase.png')} alt="Coinbase" /></a>
          <a href="https://poloniex.com/"><img className='logo-img' src= {require('./../img/poloniex.png')} alt="Poloniex" /></a>
          <a href="https://www.binance.com/"><img className='logo-img' src= {require('./../img/binance.png')} alt="Binance" /></a>
          <a href="https://yobit.net/en/"><img className='logo-img' src= {require('./../img/yobit.png')} alt="Yobit" /></a>
          <a href="https://www.kraken.com/"><img className='logo-img' src= {require('./../img/kraken.png')} alt="Kraken" /></a>
          <a href="https://www.kucoin.com/"><img className='logo-img' src= {require('./../img/kucoin.png')} alt="KuCoin" /></a>
          <a href="https://www.cryptopia.co.nz/"><img className='logo-img' src= {require('./../img/cryptopia.png')} alt="Cryptopia" /></a>
          <a href="http://coinhouse.eu/"><img className='logo-img' src= {require('./../img/coinhouse.png')} alt="CoinHouse" /></a>
        </div>
      </div>
    );
  }
}

export default Settings;
