import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.handleCoins = this.handleCoins.bind(this);
  }

  getBTCInDollars() {
    return 11354;
  }

  handleCoins() {
    const coins = {
      Ethereum: {
        name: 'Ethereum',
        amount: 6.5,
        priceBTC: 0.10586500,
        ticker: 'ETC',
      },
      Bitcoin: {
        name: 'Bitcoin',
        amount: 3.2,
        priceBTC: 1,
        ticket: 'BTC',
      },
      Litecoin: {
        name: 'Litecoin',
        amount: 12.4,
        priceBTC: 0.01626100,
        ticket: 'LTC',
      },
      Ripple: {
        name: 'Ripple',
        amount: 4795,
        priceBTC: 0.00011842,
        ticket: 'XRP',
      },
      Walton: {
        name: 'Walton',
        amount: 51,
        priceBTC: 0.00343169,
        ticket: 'WTC',
      },
    };
    return Object.keys(coins).map((coin, i) => {
      return (
        <div className="coinBox" key={i}>
          <div className='coinName'>
            {coins[coin].name}
          </div>
          <div className='ticker'>
            {coins[coin].ticker}
          </div>
          <div className='amount'>
            {coins[coin].amount}
          </div>
          <div className='amountInBTC'>
            {coins[coin].amount * this.getBTCInDollars()}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="portfolio">
        <button><Link to='/'>Log Out</Link></button>
        <div className="coinsBox">
          {this.handleCoins()}
        </div>
      </div>
    );
  }
}

export default Portfolio;
