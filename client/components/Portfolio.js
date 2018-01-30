import React, { Component } from 'react';
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
  }

  render() {
    return (
      <div>
        <section>
          <div>Portfolio Counter: {this.props.portfolioCounter}</div>
          <button onClick={() => this.props.increasePortfolioCounter()}>Increase Counter</button>
          <button onClick={() => this.props.decreasePortfolioCounter()}>Decrease Counter</button>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
