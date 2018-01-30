import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = store => ({
  portfolioCounter: store.portfolio.portfolioCounter
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    increasePortfolioCounter: actions.increasePortfolioCounter,
    decreasePortfolioCounter: actions.decreasePortfolioCounter,
  }, dispatch)
};


class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.handleCoins = this.handleCoins.bind(this);
    this.state = {total: '4.83'};
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
        ticker: 'BTC',
      },
      Litecoin: {
        name: 'Litecoin',
        amount: 12.4,
        priceBTC: 0.01626100,
        ticker: 'LTC',
      },
      Ripple: {
        name: 'Ripple',
        amount: 4795,
        priceBTC: 0.00011842,
        ticker: 'XRP',
      },
      Walton: {
        name: 'Walton',
        amount: 51,
        priceBTC: 0.00343169,
        ticker: 'WTC',
      },
    };
    let amountBTC = 0;
    return Object.keys(coins).map((coin, i) => {
      amountBTC += coins[coin].priceBTC * coins[coin].amount;
      if (i === Object.keys(coins).length - 1) {
        // need to remove setState from this method because it may run infinitely
        // this.setState({ total: (amountBTC).toFixed(5) });
      }
      return (
        <div className="coinBox" key={i}>
          <div className='coinName'>
            {coins[coin].name}
          </div>
          <div className='amount'>
            {coins[coin].amount}
          </div>
          <div className='ticker'>
            {coins[coin].ticker}
          </div>
          <div className='amountInBTC'>
            {(coins[coin].priceBTC * coins[coin].amount).toFixed(5)} BTC
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='portfolio'>
        <Link to='/'><button id='logout'>Log Out</button></Link>
        <div id='total'> Total: {this.state.total} BTC </div>
        <div className="coinsBox">
          {this.handleCoins()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
