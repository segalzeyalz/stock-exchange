import React, { Component } from 'react';
import CSS from './Popup.css';
import SimetricX from '../../components/SimetricX';
import * as UIActions from './../../constants/UIActions';
import * as stockActions from './../../constants/stockActions';
import { connect } from 'react-redux';

class Popup extends Component {
    componentDidMount(){
        
    }
    constructor(){
        super();
        this.buy = this.buy.bind(this);
    }
    buy(){
        console.log("buy")
    }
    render(){
        if(this.props.popupOpen){
            return  (<div className={CSS.Popup}>
                        <div className={CSS.Inner_popup}>
                            <SimetricX closePopup={this.props.closePopup}/>
                            <h2 className={CSS.Title}>{this.props.btn} {this.props.symbol} - {this.props.name}</h2>
                            {this.props.btn==="Buy" &&<div className={CSS.FormContainer}>
                                <label>Amount: </label>
                                <input type="number" onChange={(event)=>this.props.updateAmount(event.target.value)}/>
                            </div>}
                            <div className={CSS.ButtonsContainer}>
                                <button className={CSS.Button} onClick={(e)=>this.buy()}>{this.props.btn}</button></div>
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
            amoutn: state.UI.amoutn,
            funds:state.stocks.funds
        };
      };
      
      const mapDispatchToProps = dispatch => {
        return {
            closePopup: ()=> dispatch({type: UIActions.CLOSE_POPUP}),
            buy: (funds)=>dispatch({type:stockActions.BUY_STOCK, funds:funds}),
            updateAmount: (amount)=>dispatch({type:UIActions.UPDATE_DETAILS, amount:amount}),
            updatePrice: (price)=>dispatch({type:UIActions.UPDATE_PRICE, price:price})
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
