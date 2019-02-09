import React, { Component } from 'react';
import CSS from './AvailableFunds.scss';
import * as stockActions from './../../constants/stockActions';
import * as UIActions from './../../constants/UIActions';
import dataFuncs from './../../constants/dataFuncs';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHeader from './../../components/TableHeader'
import TableRow from '@material-ui/core/TableRow';
import SearchBar from './../SearchBar'
import SvgIcon from '@material-ui/core/SvgIcon';

class AvailableFunds extends Component {
    constructor(props){
        super()
        this.state = { filterVal:''}
    }
    portData;
    componentDidMount(){
        //Getting all available stocks
        let { onReload, api } = this.props;
        dataFuncs.fetchPortfolio(api,this)
        dataFuncs.search(api, this.state.filterVal).then(function (response) {
            let stockArr = response.data.stocks;
            if(this.portData){
                let myStock=this.portData.myStocks;
                //Filter all stocks that bought
                stockArr = dataFuncs.removeDuplicates(stockArr, myStock)
                onReload(this.state.filterVal, stockArr, this.portData.funds);
        }
          }.bind(this))
          //Refresh every 5 seconds
          setInterval(function() {
                     dataFuncs.fetchPortfolio(api,this)
                     dataFuncs.search(api, this.state.filterVal)
                    .then(function (response) {
                    let stockArr = response.data.stocks;
                    if(this.portData){
                        let myStock=this.portData.myStocks;
                        //Filter all stocks that bought
                        stockArr = dataFuncs.removeDuplicates(stockArr, myStock)
                        onReload(this.state.filterVal, stockArr, this.portData.funds);
                    }
              }.bind(this))
          }.bind(this),5000)
    }

    render(){
        let { stocks, onFilter } = this.props;
        return (<div className={CSS.AvailableFunds}>
                    <SearchBar/>
                    <div className={CSS.Center}>
                        <h2>My Available Funds: {this.props.funds}</h2>
                    </div>
                    {/* Show only when srarched */}
                   {this.props.filterVal!=="" && <Table>
                   <TableHeader type={"AvailableFunds"} filters={[{item: "symbol", name: "Symbol"},{item: "name", name: "Name"}, {item: "currentPrice", name: "Price"}]} onFilter={onFilter}/>
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
        api:state.stocks.api,
        stocks:state.stocks.filteredStocks,
        filterVal: state.stocks.filterVal,
        funds:state.stocks.funds
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onFilter: (name) => dispatch({type:stockActions.SORT_AVAILABLE_STOCKS, filterBy:name}),
      onOpen: (symbol, name)=> dispatch({type:UIActions.OPEN_POPUP, Btn:"Buy", symbol:symbol, name:name}),
      onReload: (val, stockArr, funds) => dispatch({type:stockActions.FILTER_AVAILABLE_STOCKS, val:val, stocks: stockArr, funds:funds}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableFunds);