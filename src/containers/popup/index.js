import React, { Component } from 'react';
import CSS from './Popup.css';
import SimetricX from '../../components/SimetricX';
import * as actionTypes from './../../constants/UIActions';
import { connect } from 'react-redux';

class Popup extends Component {
    render(){
        if(this.props.popupOpen){
                return  (<div className={CSS.Popup}>
                           <div className={CSS.Inner_popup}>
                                <SimetricX closePopup={this.props.closePopup}/>
                                <h2 className={CSS.Title}>{this.props.btn} {this.props.symbol} - {this.props.name}</h2>
                                <div className={CSS.FormContainer}>
                                    <label>Project Name: </label>
                                    <input type="text" onChange={(event)=>console.log(event)}/>
                                </div>
                                <div className={CSS.ButtonsContainer}>
                                    <button className={CSS.Button} onClick={(e)=>console.log(e)}>Save</button></div>
                                </div>
                       </div>)}else{
                           return null
                       }
            
    }
}

    const mapStateToProps = state => {
        return {
            popupOpen:state.UI.popupOpen,
            name:state.UI.name,
            symbol: state.UI.symbol,
            btn:state.UI.Btn
        };
      };
      
      const mapDispatchToProps = dispatch => {
        return {
            closePopup: ()=> dispatch({type: actionTypes.CLOSE_POPUP}),
        }
    }
export default connect(mapStateToProps, mapDispatchToProps)(Popup);
