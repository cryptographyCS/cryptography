import React, { Component } from 'react';
/*eslint-disable*/
class APIForm extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          Please go to <a href={this.props.url}>{this.props.exchange}</a> to request an API key and secret token. Then, enter the information below.
        </div>
        <form>
          <img src={require('./../img/cancel.png')} onClick={() => this.props.closePopup(this.props.exchange)}/>
          <input placeholder="API key" type="text" />
          <input placeholder="Secret token" type="text" />
          <button className='submit' onClick={() => this.props.closePopup(this.props.exchange)}>Submit</button>
        </form>
      </div>
    );
  }
}

export default APIForm;
