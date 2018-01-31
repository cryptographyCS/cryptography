import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
/*eslint-disable*/
const mapStateToProps = store => ({
  authenticated: store.user.authenticated,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    signOutUser: actions.signOutUser,
  }, dispatch)
};


class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.handleCoins = this.handleCoins.bind(this);
    this.state = {
      total: 0,
      sortedNum: false,
      sortName: false,
      coins: [
        {
          name: 'Ethereum',
          amount: 6.5,
          priceBTC: 0.10586500,
          ticker: 'ETC',
        },
       {
          name: 'Bitcoin',
          amount: 3.2,
          priceBTC: 1,
          ticker: 'BTC',
        },
        {
          name: 'Litecoin',
          amount: 12.4,
          priceBTC: 0.01626100,
          ticker: 'LTC',
        },
        {
          name: 'Ripple',
          amount: 4795,
          priceBTC: 0.00011842,
          ticker: 'XRP',
        },
        {
          name: 'Walton',
          amount: 50000,
          priceBTC: 0.00343169,
          ticker: 'WTC',
        }
      ]
    }
  }

  getBTCInDollars() {
    return 11354
  }

  filterAmount() {
    if (!this.state.sortedNum) {
      this.setState((prevState) => {
        const coinsSorted = prevState.coins.sort((a, b) => {
          const sortedInt =  (a.priceBTC * a.amount) - (b.priceBTC * b.amount);
          return sortedInt;
        });
        return { coins: coinsSorted, sortedNum: !prevState.sortedNum };
      });
    } else {
      this.setState((prevState) => {
        const coinsSorted = prevState.coins.sort((a, b) => {
          const sortedInt = (b.priceBTC * b.amount) - (a.priceBTC * a.amount);
          return sortedInt;
        });
        return { coins: coinsSorted, sortedNum: !prevState.sortedNum };
      });
    }
  }

  filterAlphabetical() {
    if (!this.state.sortedName) {
      this.setState((prevState) => {
        const coinsSorted = prevState.coins.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          else if (nameA > nameB) return 1;
          return 0;
        });
        return { coins: coinsSorted, sortedName: !prevState.sortedName };
      });
    } else {
      this.setState((prevState) => {
        const coinsSorted = prevState.coins.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return 1;
          else if (nameA > nameB) return -1;
          return 0;
        });
        return { coins: coinsSorted, sortedName: !prevState.sortedName };
      });
    }
  }

  handleCoins() {
    let amountBTC = 0;
    // this logic should be moved to the reducers so that it is accessible elsewhere in the app
    const coinsDiv = this.state.coins.map((coin, i) => {
      amountBTC = amountBTC + coin.priceBTC * coin.amount;
      return (
        <div className='coinBox' key={i}>
          <div className='coinName'>
            {coin.name}
          </div>
          <div className='amount'>
            {coin.amount}
          </div>
          <div className='ticker'>
            {coin.ticker}
          </div>
          <div className='amountInBTC'>
            {(coin.priceBTC * coin.amount).toFixed(5)} BTC
          </div>
        </div>
      )
    })
    // could be added to componentDidUpdate
    if (this.state.total === 0) this.setState({ total: amountBTC.toFixed(5) });
    return coinsDiv;
  }

  render() {
    // Redirect to / after logging out
    // better place to do this?
    if (!this.props.authenticated) {
      return <Redirect to="/" />
    }
    return (
      <div className='portfolio'>
        <button id='logout' onClick={() => this.props.signOutUser(this.props)}>Log Out</button>
        <Link to='/settings' className='header-navigate'>Settings </Link>
        <span id='refresh'> Refresh </span>
        <div className='coinsBox'>
          <div id='coinHeaderBox'>
            <div id='total' Total: {this.state.total}> BTC </div>
            <div id='header-name' onClick={this.filterAlphabetical.bind(this)}> Name </div>
            <div id='header-amount' onClick={this.filterAmount.bind(this)}> Amount </div>
          </div>
          {this.handleCoins()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
