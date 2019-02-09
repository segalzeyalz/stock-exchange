import React, { Component } from 'react';
import * as stocksAction from './../../constants/stockActions';
import Funds from './../../components/Funds';
import UpdatePointer from './../../constants/UpdatePointer';
import dataFuncs from './../../constants/dataFuncs';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHeader from './../../components/TableHeader'
import TableRow from '@material-ui/core/TableRow';
import SvgIcon from '@material-ui/core/SvgIcon';
import CSS from './Portfolio.scss';

class Portfolio extends Component {
    portData;
    constructor(){
        super();
        this.sell = this.sell.bind(this);
    }
    sell(symbol){
        let {api} = this.props;
        let updatePortfolio = this.props.getPortfolio;
        //Post via API
        dataFuncs.sell(api, symbol)
        //Update the list
        dataFuncs.portfolioPromise(api).then(function(reponse){
            updatePortfolio(reponse)
        })
    }
    componentDidMount(){
        let { api } = this.props;
        let self = this;
        dataFuncs.portfolioPromise(api)
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
       setTimeout(() => {
            dataFuncs.portfolioPromise(api)
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
       }, 5000);
    }


    render(){
        let { stocks, sortPortfolio } = this.props;
        return (<div className={CSS.Portfolio}>
                    <Funds funds={this.props.funds}/>
                   <Table>
                   <TableHeader type={"Portfolio"} filters={[{item: "symbol", name: "Symbol"},{item: "name", name: "Name"},
                       {item: "quantity", name: "Purchased Quantity"},{item: "purchasePrice", name: "Purchase Price"},
                       {item: "currentPrice", name: "Current Price"},{item: "profit", name: "Profit"},
                       {item: "startOfCommerce", name: "Start Of Commerce"}]}
                       onFilter={sortPortfolio}/>
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
        api:state.stocks.api,
        funds:state.stocks.funds
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getPortfolio: (stocks) => dispatch({type:stocksAction.UPDATE_PORTFOLIO, stocks:stocks}),
      sortPortfolio: (param) => dispatch({type:stocksAction.SORT_PORTFOLIO_STOCKS, filterBy: param}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);