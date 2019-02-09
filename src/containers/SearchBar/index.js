import React, { Component } from 'react';
import * as stockActions from './../../constants/stockActions';
import { connect } from 'react-redux';
import dataFuncs from './../../constants/dataFuncs';
import CSS from './SearchBar.scss';

class SearchBar extends Component {
    constructor(){
        super();
        this.onChange = this.onChange.bind(this)
    }
    portData;
    onChange(e){
        let self = this;
        self.val = e.target.value;
        let { onChange, api } = this.props;
        dataFuncs.fetchPortfolio(api, self)
        //search and remove duplicates
        dataFuncs.search(api, self.val).then(function (response) {
              if(self.portData){
                let stockArr = response.data.stocks;
                let myStock=self.portData.myStocks;
                //Filter all stocks that bought
                stockArr = dataFuncs.removeDuplicates(stockArr, myStock);
                onChange(self.val, stockArr)
            }
        })
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
      onChange: (val, stockArr) => dispatch({type:stockActions.FILTER_AVAILABLE_STOCKS, val:val, stocks: stockArr}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);