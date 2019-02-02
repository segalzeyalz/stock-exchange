import React, { Component } from 'react';
import * as actionTypes from './../../constants/stockActions';
import { connect } from 'react-redux';
import CSS from './SearchBar.css';

class SearchBar extends Component {
    render(){
        return (<div className={CSS.SearchContainer}>
                    <h1>SearchContainer</h1>
                </div>)
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
      onKeyPress: (e) => dispatch({type:actionTypes.FILTER_AVAILABLE_STOCKS, val:e.target.value}),
    }
}
export default connect(null, mapDispatchToProps)(SearchBar);