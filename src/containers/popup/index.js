import React, { Component } from 'react';
import CSS from './Popup.css';
import dataFuncs from './../../constants/dataFuncs';
import SimetricX from '../../components/SimetricX';
import Button from '@material-ui/core/Button';
import * as UIActions from './../../constants/UIActions';
import * as stockActions from './../../constants/stockActions';
import { connect } from 'react-redux';
import axios from 'axios';

class Popup extends Component {
    constructor(){
        super();
        this.buy = this.buy.bind(this);
    }
    buy(){
        let { api,symbol,amount } = this.props;
        axios.post(`${api}/market/buy`,{
            "stockSymbol": symbol,
            "stockQuantity":amount
          })
            .then(()=>{
                this.props.removeAvailable(symbol);
                this.props.closePopup();
            })
    }
    componentDidMount(){
        setInterval(()=>{
            let {api, symbol, updatePrice} = this.props;
            dataFuncs.updatePrice.bind(this)(api,symbol, updatePrice)
        },5000)
    }
    componentDidUpdate(){
        let {api, symbol, updatePrice} = this.props;
        dataFuncs.updatePrice.bind(this)(api,symbol, updatePrice)
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
        };
      };
      
      const mapDispatchToProps = dispatch => {
        return {
            removeAvailable: (symbol)=>dispatch({type:stockActions.REMOVE_AVAILABLE, symbol:symbol}),
            closePopup: ()=> dispatch({type: UIActions.CLOSE_POPUP}),
            updateAmount: (amount)=>dispatch({type:UIActions.UPDATE_DETAILS, name: "quantity", val:amount}),
            updatePrice: (price)=>dispatch({type:UIActions.UPDATE_DETAILS, name:"price", val:price})
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
