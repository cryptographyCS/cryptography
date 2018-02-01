import React, { Component } from 'react';
/*eslint-disable*/
class APIForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchange: this.props.exchange,
      apiKey: null,
      apiSecret: null,
    }
  }
  
  handleKey(event) {
    this.setState({apiKey: event.target.value});
  }
  
  handleToken(event) {
    this.setState({apiSecret: event.target.value})
  }
  
  
  render() {
    return (
      <div className='popup'>
        <form className='popup_inner'>
          <img id='close-icon' src={require('./../img/cancel.png')} onClick={() => this.props.closePopup(this.props.exchange)}/>
          <div id='popup-directions'>
            Please go to <a target='_blank' href={this.props.url}>{this.props.exchange}</a> to request an API key and secret token. Then, enter the information below.
          </div>
          <input className='popup-input' placeholder="API key" type="text" onChange={event => this.handleKey(event)}/>
          <input className='popup-input' placeholder="Secret token" type="text" onChange={event => this.handleToken(event)}/>
          <button className='submit' onClick={() => {this.props.addExchange(this.state); this.props.closePopup(this.props.exchange)}}>Submit</button>
        </form>
      </div>
    );
  }
}

export default APIForm;
