import React, { Component } from 'react';
import * as actionTypes from './../../constants/stockActions';
import { connect } from 'react-redux';
import CSS from './Portfolio.css';

class Portfolio extends Component {
    render(){
        return (<div className={CSS.Portfolio}>
                    <h1>Portfolio</h1>
                </div>)
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(null, mapDispatchToProps)(Portfolio);