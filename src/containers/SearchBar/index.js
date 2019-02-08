import React, { Component } from 'react';
import * as actionTypes from './../../constants/stockActions';
import { connect } from 'react-redux';

import CSS from './SearchBar.css';

class SearchBar extends Component {
    render(){
        return (<div className={CSS.SearchContainer}>
                    <input onChange={(e)=>this.props.onChange(e)} type="text" placeholder="Search.." className={CSS.SearchInput}/>
                </div>)
    }
}
   const mapStateToProps = state => {
        return {
            stocks:state.stocks.stocks,
            searchStock:state.stocks.searchStock
        };
    };
  const mapDispatchToProps = dispatch => {
    return {
      onChange: (e) => dispatch({type:actionTypes.FILTER_AVAILABLE_STOCKS, val:e.target.value}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);