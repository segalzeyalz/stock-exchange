import React, { Component } from 'react';
import * as stocksAction from './../../constants/stockActions';
import UpdatePointer from './../../constants/UpdatePointer';
import dataFuncs from './../../constants/dataFuncs';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import SvgIcon from '@material-ui/core/SvgIcon';
import CSS from './Portfolio.css';

class Portfolio extends Component {
    portData;
    constructor(){
        super();
        this.sell = this.sell.bind(this);
    }
    sell(symbol){
        let {api} = this.props;
        axios.post(`${api}/market/sell`,{
            "stockSymbol": symbol,
          })
    }
    componentWillUpdate(){
        let { api } = this.props;
        let self = this;
        fetch(`${api}/portfolio`)
        .then(response => response.json())
        .then((portData) => {
            self.portData = portData;
            //get all stocks symbol for only one api call
            let params = dataFuncs.getParams(portData.myStocks)
            fetch(`${api}/${params}`)
            .then(res=> res.json())
            .then((data)=>{ 
                for (let i=0;i<data.stocks.length; i++) {
                    UpdatePointer(self.portData.myStocks[i],data.stocks[i])
             }
             this.props.getPortfolio(self.portData)
                })
       }); 
    }
    componentDidMount(){
        let { api } = this.props;
        let self = this;
        fetch(`${api}/portfolio`)
        .then(response => response.json())
        .then((portData) => {
            self.portData = portData;
            //get all stocks symbol for only one api call
            let params = dataFuncs.getParams(portData.myStocks)
            fetch(`${api}/${params}`)
            .then(res=> res.json())
            .then((data)=>{ 
                for (let i=0;i<data.stocks.length; i++) {
                    UpdatePointer(self.portData.myStocks[i],data.stocks[i])
             }
             this.props.getPortfolio(self.portData)
                })
       });
       //Update every 5 seconds
       setInterval(()=>{
        if(self.portData){
            let { myStocks } = self.portData;
            let params = dataFuncs.getParams(myStocks)

            fetch(`${api}/${params}`)
            .then(res=> res.json())
            .then((data)=>{ 
                //add more parameters - name, price, startofcommerce
                for (let i=0;i<data.stocks.length; i++) {
                UpdatePointer(self.portData.myStocks[i],data.stocks[i])
            }
            this.props.getPortfolio(self.portData)})
        }
      },5000)
            
    }

    render(){
        let { stocks } = this.props;
        return (<div className={CSS.Portfolio}>
                    <div className={CSS.Center}><h2>My Portfolio</h2></div>
                   <Table>
                       <TableHead>
                        <TableRow>
                           <TableCell onClick={()=>this.props.sortPortfolio("symbol")}>Symbol</TableCell>
                           <TableCell onClick={()=>this.props.sortPortfolio("name")}>Name</TableCell>
                           <TableCell onClick={()=>this.props.sortPortfolio("quantity")}>Purchased Quantity</TableCell>
                           <TableCell onClick={()=>this.props.sortPortfolio("purchasePrice")}>Purchase Price</TableCell>
                           <TableCell onClick={()=>this.props.sortPortfolio("currentPrice")}>Current Price</TableCell>
                           <TableCell onClick={()=>this.props.sortPortfolio("profit")}>Profit</TableCell>
                           <TableCell onClick={()=>this.props.sortPortfolio("startOfCommerce")}>Start Of Commerce</TableCell>
                           <TableCell>sell</TableCell>
                        </TableRow>
                       </TableHead>
                     <TableBody>
                       {stocks.map(elem=> {
                           return <TableRow key={elem.symbol}>
                                    <TableCell>{elem.symbol}</TableCell>
                                    <TableCell>{elem.name}</TableCell>
                                    <TableCell>{elem.quantity}</TableCell>
                                    <TableCell>{elem.purchasePrice}</TableCell>
                                    <TableCell>{elem.currentPrice}</TableCell>
                                    <TableCell>
                                        <div className={CSS.Trend}>
                                            <span className={elem.profit>0? CSS.Positive:CSS.Negative}>{((elem.profit/elem.purchasePrice)*100).toFixed(3)}%</span>
                                            <span className={elem.profit>0? CSS.PositiveArrow:CSS.NegativeArrow}></span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{elem.startOfCommerce}</TableCell>
                                    <TableCell>
                                        <SvgIcon className={CSS.Clicked} onClick={()=>this.sell(elem.symbol)}>
                                            <path d="M9.56 8.1c-1.6-.51-2.66-.71-2.66-1.88 0-.83.72-1.62 2.1-1.62 1.59 0 2.1.88 2.1 1.94H13c0-1.79-1.17-3.09-3-3.44V1H8v2.11c-1.58.32-3 1.37-3 3.12 0 2.25 1.78 2.8 4 3.52 1.88.61 2.25 1.04 2.25 2.09 0 .9-.67 1.56-2.25 1.56-1.2 0-2.25-.84-2.25-2.06h-2c0 1.88 1.38 3.2 3.25 3.56V17h2v-2.07c2.04-.29 3.2-1.49 3.2-3.1 0-1.87-.94-2.87-3.64-3.73z"/>
                                        </SvgIcon>
                                    </TableCell>
                                 </TableRow>
                        }
                    )}</TableBody>
                   </Table>
                </div>)
    }
}
  
const mapStateToProps = state => {
    return {
        stocks:state.stocks.stocks,
        filteredPortfolio:state.stocks.filteredPortfolio,
        api:state.stocks.api
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getPortfolio: (stocks) => dispatch({type:stocksAction.UPDATE_PORTFOLIO, stocks:stocks}),
      sortPortfolio: (param) => dispatch({type:stocksAction.SORT_PORTFOLIO_STOCKS, filterBy: param}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);