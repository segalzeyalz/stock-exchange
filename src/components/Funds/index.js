import React, { Component } from 'react';
import CSS from './Funds.scss';

class Funds extends Component {
  render() {
    return (
        <div className={CSS.Center}>
            <h2 title="funds">My Available Funds: {this.props.funds}</h2>
        </div>
    );
  }
}

export default Funds;


