import React, { Component } from 'react';
import * as stockActions from './../../constants/stockActions';
import { connect } from 'react-redux';
import UpdatePointer from './../../constants/UpdatePointer';
import dataFuncs from './../../constants/dataFuncs';
import propTypes from 'prop-types';
import CSS from './SearchBar.scss';

class SearchBar extends Component {
    constructor(){
        super();
        this.state = {
            searchVal:''
        }
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
                    let params = dataFuncs.getParams(portData.myStocks)
                    let stockArr = response.data.stocks;
                    let myStock=self.portData.myStocks;
                    fetch(`${api}/${params}`)
                    .then(res=> res.json())
                    .then((data)=>{ 
                        for (let i=0;i<data.stocks.length; i++) {
                            ((elem1, array)=>UpdatePointer(elem1,array))(self.portData.myStocks[i], data.stocks)
                    }})
                    //get all stocks symbol for only one api call
                    //Filter all stocks that bought
                    stockArr = dataFuncs.removeDuplicates(stockArr, myStock);
                    onChange(stockArr, self.val)
                    //To allow the settimeout function to get the updated data
                    self.setState({searchVal:self.val})
              })
        })
}

componentDidMount(){
    let self = this;
    setInterval(()=>{
        let { updatePortfolio, onChange, api, sortBy } = this.props;
        
        dataFuncs.portfolioPromise(api).then((portData)=>{
            self.portData=portData;
                dataFuncs.search(api, self.state.searchVal).then(function (response) {
                    let stockArr = response.data.stocks;
                    let myStock=self.portData.myStocks;
                dataFuncs.portfolioPromise(api)
                .then((portData) => {
                    self.portData = portData;
                    //get all stocks symbol for only one api call
                    let params = dataFuncs.getParams(portData.myStocks)
                    fetch(`${api}/${params}`)
                    .then(res=> res.json())
                    .then((data)=>{ 
                        for (let i=0;i<data.stocks.length; i++) {
                            ((elem1, array)=>UpdatePointer(elem1,array))(self.portData.myStocks[i], data.stocks)
                    }
                    if(sortBy){
                        //keep it sorted
                        self.portData.myStocks = dataFuncs.sort(sortBy,self.portData.myStocks)
                    }
                    updatePortfolio(self.portData)
                })
            });
                    //Filter all stocks that bought
                    stockArr = dataFuncs.removeDuplicates(stockArr, myStock);
                    onChange(stockArr, self.state.searchVal)
                    updatePortfolio(self.portData)
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
            filterVal: state.stocks.filterVal,
            stocks:state.stocks.stocks,
            sortBy: state.stocks.lastAvaiableSortedBy,
            val: state.stocks.filterVal,
        };
    };
  const mapDispatchToProps = dispatch => {
    return {
      onChange: (stockArr,val) => dispatch({type:stockActions.SEARCH, val:val, stocks: stockArr}),
      updatePortfolio: (stocks)=>dispatch({type: stockActions.UPDATE_PORTFOLIO, stocks:stocks})
    }
}
SearchBar.propTypes = {
    onChange: propTypes.func,
    api:propTypes.string,
    stocks: propTypes.array,
    val: propTypes.string
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);