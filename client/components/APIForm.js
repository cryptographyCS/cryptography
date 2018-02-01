import React, { Component } from 'react';
/*eslint-disable*/
class APIForm extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='popup'>
        <form className='popup_inner'>
          <img id='close-icon' src={require('./../img/cancel.png')} onClick={() => this.props.closePopup(this.props.exchange)}/>
          <div id='popup-directions'>
            Please go to <a target='_blank' href={this.props.url}>{this.props.exchange}</a> to request an API key and secret token. Then, enter the information below.
          </div>
          <input className='popup-input' placeholder="API key" type="text" />
          <input className='popup-input' placeholder="Secret token" type="text" />
          <button className='submit' onClick={() => this.props.closePopup(this.props.exchange)}>Submit</button>
        </form>
      </div>
    );
  }
}

export default APIForm;
