import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
/*eslint-disable*/

const mapStateToProps = store => ({
  // coins: store.portfolio.coins,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    signOutUser: actions.signOutUser,
    // getCoins: actions.getCoins,
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
      coins: [],
    }
  }

  updateCoins() {
    console.log('fetching')
    fetch('/api/update', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(response => {
        // all logic for coins should be called in here probably
        let amountBTC = 0;
        response.map((coin) => {
          amountBTC = amountBTC + coin.priceBTC * coin.amount;
        });
        this.setState({ total: (amountBTC).toFixed(5) })
        this.setState({ coins: response })
      })
      .catch(err => console.log('Error fetching coins'));
  }

  componentDidMount() {
    if (this.state.coins.length === 0) this.updateCoins();
  }

  getBTCInDollars() {
    // need to fetch the price. Need to use an API here
    return 9354
  }

  filterAmount() {
    if (!this.state.sortedNum) {
      this.setState((prevState) => {
        const coinsSorted = prevState.coins.sort((a, b) => {
          const sortedInt = (a.priceBTC * a.amount) - (b.priceBTC * b.amount);
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
            {coin.name.toLocaleString()}
          </div>
          <div className='amount'>
            {coin.amount.toLocaleString()}
          </div>
          <div className='ticker'>
            {coin.ticker.toLocaleString()}
          </div>
          <div className='amountInBTC'>
            {(coin.priceBTC * coin.amount).toFixed(5).toLocaleString()} BTC
          </div>
        </div>
      )
    })
    console.log('TOTAL', amountBTC)
    // could be added to componentDidUpdate
    if (this.state.total === 0) this.setState({ total: amountBTC.toFixed(5) });
    return coinsDiv;
  }

  render() {
    return (
      <div className='app'>
        <button id='logout' onClick={() => this.props.signOutUser(this.props)}>Log Out</button>
        <Link to='/settings' className='header-navigate'>Settings </Link>
        <span id='refresh' onClick={this.updateCoins.bind(this)}> Refresh </span>
        <div className='coinsBox'>
          <div id='coinHeaderBox'>
            <div id='total'> Total: {this.state.total} BTC </div>
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
