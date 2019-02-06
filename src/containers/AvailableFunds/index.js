import React, { Component } from 'react';
import CSS from './AvailableFunds.css';
import * as stockActions from './../../constants/stockActions';
import * as UIActions from './../../constants/UIActions';
import dataFUncs from './../../constants/dataFuncs';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchBar from './../SearchBar'
import SvgIcon from '@material-ui/core/SvgIcon';
import axios from 'axios';

class AvailableFunds extends Component {
    portData;
    componentDidMount(){
        //Getting all available stocks
        let { onReload, api } = this.props;
        let self = this;
        dataFUncs.fetchPortfolio.bind(this)(api,self)
        axios.post(`${api}/market/search`,{
            "searchString": this.props.filterVal
          }).then(function (response) {
            let stockArr = response.data.stocks;
            if(self.portData){
            let myStock=self.portData.myStocks;
            //Filter all stocks that bought
            stockArr = dataFUncs.removeDuplicates(stockArr, myStock)
            onReload(stockArr, self.portData.funds);}
          })
          //Refresh every 5 seconds
          setInterval(()=>{
                     dataFUncs.fetchPortfolio.bind(this)(api,self)
                    axios.post(`${api}/market/search`,{
                    "searchString": this.props.filterVal
                  })
              .then(function (response) {
                let stockArr = response.data.stocks;
            if(self.portData){
                let myStock=self.portData.myStocks;
                //Filter all stocks that bought
                
                stockArr = dataFUncs.removeDuplicates(stockArr, myStock)
                onReload(stockArr, self.portData.funds);
            }
              })
          },5000)
    }

    componentWillUpdate(){
                //Getting all available stocks
                let { onReload, api } = this.props;
                let self = this;
                fetch(`${api}/portfolio`)
                .then(response => response.json())
                .then((portData) => {
                    self.portData = portData
                })
                axios.post(`${api}/market/search`,{
                    "searchString": this.props.filterVal
                  }).then(function (response) {
                    let stockArr = response.data.stocks;
                    if(self.portData){
                    let myStock=self.portData.myStocks;
                    //Filter all stocks that bought
                    stockArr = dataFUncs.removeDuplicates(stockArr, myStock)
                    onReload(stockArr, self.portData.funds);
                    }
                  })
    }
    render(){
        let { stocks, onFilter } = this.props;
        return (<div className={CSS.AvailableFunds}>
                    <SearchBar/>
                    <div className={CSS.Center}>
                        <h2>My Available Funds: {this.props.funds}</h2>
                    </div>
                   {this.props.filterVal!=="" && <Table>
                       <TableHead>
                        <TableRow>
                           <TableCell onClick={()=>onFilter("symbol")}>Symbol</TableCell>
                           <TableCell onClick={()=>onFilter("name")}>Name</TableCell>
                           <TableCell onClick={()=>onFilter("currentPrice")}>Price</TableCell>
                           <TableCell>Buy</TableCell>
                        </TableRow>
                       </TableHead>
                     <TableBody>
                       {stocks.map(elem=> {
                           return <TableRow key={elem.symbol}>
                                    <TableCell>{elem.symbol}</TableCell>
                                    <TableCell>{elem.name}</TableCell>
                                    <TableCell>{elem.currentPrice}</TableCell>
                                    <TableCell>
                                        <SvgIcon className={CSS.Clicked} onClick={()=>this.props.onOpen(elem.symbol, elem.name)}>
                                            <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
                                        </SvgIcon>
                                    </TableCell>
                                 </TableRow>
                        }
                    )}</TableBody>
                   </Table>}
                </div>)
    }
}
  
const mapStateToProps = state => {
    return {
        stocks:state.stocks.filteredStocks,
        api:state.stocks.api,
        filterVal: state.stocks.filterVal,
        funds:state.stocks.funds
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onFilter: (name) => dispatch({type:stockActions.SORT_AVAILABLE_STOCKS, filterBy:name}),
      onReload: (availableStocks,funds) => dispatch({type:stockActions.UPDATE_AVAILABLE, availableStocks:availableStocks, funds:funds}),
      onOpen: (symbol, name)=> dispatch({type:UIActions.OPEN_POPUP, Btn:"Buy", symbol:symbol, name:name})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableFunds);