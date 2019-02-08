import React, { Component } from 'react';
import * as stockActions from './../../constants/stockActions';

import { connect } from 'react-redux';
import dataFuncs from './../../constants/dataFuncs';
import axios from 'axios';

import CSS from './SearchBar.scss';

class SearchBar extends Component {
    constructor(){
        super();
        this.onChange = this.onChange.bind(this)
    }
    portData;
    onChange(e){
        let self = this;
        let {onChange ,onReload, api } = this.props;
        dataFuncs.fetchPortfolio.bind(this)(api, self)
        axios.post(`${api}/market/search`,{
            "searchString": e.target.value
          }).then(function (response) {
              if(self.portData){
                let stockArr = response.data.stocks;
                let myStock=self.portData.myStocks;
                //Filter all stocks that bought
                stockArr = dataFuncs.removeDuplicates(stockArr, myStock)
                onReload(stockArr, self.portData.funds);}
            })
            onChange(e)
}

    render(){
        return (<div className={CSS.SearchContainer}>
                    <input onChange={(e)=>this.onChange(e)} type="text" placeholder="Search.." className={CSS.SearchInput}/>
                </div>)
    }
}
   const mapStateToProps = state => {
        return {
            api:state.stocks.api,
            stocks:state.stocks.stocks,
            searchStock:state.stocks.searchStock
        };
    };
  const mapDispatchToProps = dispatch => {
    return {
      onChange: (e) => dispatch({type:stockActions.FILTER_AVAILABLE_STOCKS, val:e.target.value}),
      onReload: (availableStocks,funds) => dispatch({type:stockActions.UPDATE_AVAILABLE, availableStocks:availableStocks, funds:funds}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);