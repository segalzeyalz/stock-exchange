import React, { Component } from 'react';
import CSS from './Popup.scss';
import dataFuncs from './../../constants/dataFuncs';
import SimetricX from '../../components/SimetricX';
import Button from '@material-ui/core/Button';
import * as UIActions from './../../constants/UIActions';
import * as stockActions from './../../constants/stockActions';
import { connect } from 'react-redux';

class Popup extends Component {
    constructor(){
        super();
        this.buy = this.buy.bind(this);
    }
    buy(){
        let { api, symbol, amount } = this.props;
        dataFuncs.buy(api, symbol, amount).then(()=>{
            this.props.removeAvailable(symbol);
            this.props.closePopup();
            })
        let self = this;
        dataFuncs.fetchPortfolio(api, self)
        dataFuncs.search(api, this.props.filterVal)
        .then(function (response) {
            let filteredStocks = response.data.stocks;
            if(self.portData){
                let myStock=self.portData.myStocks;
                //Filter all stocks that bought
                filteredStocks = dataFuncs.removeDuplicates(filteredStocks, myStock)
                self.props.onReload(filteredStocks, self.portData.myStocks, self.portData.funds)
            }
        })
    }
    componentDidMount(){
        setInterval(()=>{
            let {api, symbol, updatePrice} = this.props;
            dataFuncs.updatePrice(api,symbol, updatePrice)
        },5000)
    }
    componentDidUpdate(){
        let {api, symbol, updatePrice} = this.props;
        dataFuncs.updatePrice(api,symbol, updatePrice)
    }
    render(){
        let {price, amount, funds, btn, symbol, name} = this.props;
        if(this.props.popupOpen){
            return  (<div className={CSS.Popup}>
                        <div className={CSS.Inner_popup}>
                            <SimetricX closePopup={this.props.closePopup}/>
                            <h2 className={CSS.Title}>{btn} {symbol} - {name}</h2>
                              <div className={CSS.FormContainer}>
                                <label>Amount: </label>
                                <input type="number" min={0} onChange={(e)=>this.props.updateAmount(e.target.value)}/>
                            </div>
                            <h3>Current Price: {price}</h3>
                            <h3>Total Price: {parseFloat(price*amount)}</h3>
                            <div className={CSS.ButtonsContainer}>
                                <Button onClick={()=>this.buy()}
                                    disabled={parseFloat(price*amount)>funds}
                                    variant="contained" color="primary">
                                    {btn}
                                </Button>
                            </div>
                        </div>
                    </div>)}
        else{
             return null;
                }
            
    }
}

    const mapStateToProps = state => {
        return {
            popupOpen:state.UI.popupOpen,
            name:state.UI.name,
            symbol: state.UI.symbol,
            btn:state.UI.Btn,
            amount: state.UI.quantity,
            price:state.UI.price,
            funds:state.stocks.funds,
            api:state.stocks.api,
            filterVal: state.stocks.filterVal
        };
      };
      
      const mapDispatchToProps = dispatch => {
        return {
            removeAvailable: (symbol)=>dispatch({type:stockActions.REMOVE_AVAILABLE, symbol:symbol}),
            closePopup: ()=> dispatch({type: UIActions.CLOSE_POPUP}),
            updateAmount: (amount)=>dispatch({type:UIActions.UPDATE_DETAILS, name: "quantity", val:amount}),
            updatePrice: (price)=>dispatch({type:UIActions.UPDATE_DETAILS, name:"price", val:price}),
            onReload: (filteredStocks, stocks, funds)=>dispatch({type: stockActions.RELOAD, filteredStocks:filteredStocks, stocks:stocks, funds:funds})
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
