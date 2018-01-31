import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
/*eslint-disable*/
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
    this.state = {
      total: 0,
      coins: {
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
        }
      }
    }
  }

  getBTCInDollars() {
    return 11354
  }

  handleCoins() {
    let amountBTC = 0;
    // this logic should be moved to the reducers so that it is accessible elsewhere in the app
    const coinsDiv = Object.keys(this.state.coins).map((coin, i) => {
      amountBTC = amountBTC + this.state.coins[coin].priceBTC * this.state.coins[coin].amount;
      return (
        <div className="coinBox" key={i}>
          <div className='coinName'>
            {this.state.coins[coin].name}
          </div>
          <div className='amount'>
            {this.state.coins[coin].amount}
          </div>
          <div className='ticker'>
            {this.state.coins[coin].ticker}
          </div>
          <div className='amountInBTC'>
            {(this.state.coins[coin].priceBTC * this.state.coins[coin].amount).toFixed(5)} BTC
          </div>
        </div>
      )
    })
    // could be added to componentDidUpdate
    if (this.state.total === 0) this.setState({total: amountBTC.toFixed(5)});
    return coinsDiv;
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
