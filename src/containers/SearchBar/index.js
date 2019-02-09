import React, { Component } from 'react';
import * as stockActions from './../../constants/stockActions';
import { connect } from 'react-redux';
import dataFuncs from './../../constants/dataFuncs';
import PropTypes from 'prop-types';
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
        dataFuncs.portfolioPromise(api).then((portData)=>{
            self.portData=portData;
                dataFuncs.search(api, self.val).then(function (response) {
                    let stockArr = response.data.stocks;
                    let myStock=self.portData.myStocks;
                    //Filter all stocks that bought
                    stockArr = dataFuncs.removeDuplicates(stockArr, myStock);
                    onChange(self.val, stockArr)
              })
        })
}

componentDidMount(){
    let self = this;
    self.val = this.props.val;
    setInterval(()=>{
        let { onChange, api } = this.props;
        dataFuncs.portfolioPromise(api).then((portData)=>{
            self.portData=portData;
                dataFuncs.search(api, self.props.val).then(function (response) {
                    let stockArr = response.data.stocks;
                    let myStock=self.portData.myStocks;
                    //Filter all stocks that bought
                    stockArr = dataFuncs.removeDuplicates(stockArr, myStock);
                    onChange(self.props.val, stockArr)
              })
        })
    },5000)
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
            val: state.stocks.filterVal
        };
    };
  const mapDispatchToProps = dispatch => {
    return {
      onChange: (val, stockArr) => dispatch({type:stockActions.SEARCH, val:val, stocks: stockArr}),
    }
}
SearchBar.prototypes = {
    onChange: PropTypes.func,
    api:PropTypes.string,
    stocks: PropTypes.array,
    val: PropTypes.string
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);