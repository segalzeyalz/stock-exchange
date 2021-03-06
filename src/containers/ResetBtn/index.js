import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CSS from './Btn.scss';
import * as stocksAction from './../../constants/stockActions';
import dataFuncs from './../../constants/dataFuncs';
import { connect } from 'react-redux';

class ResetBtn extends Component {
  constructor(){
    super();
    this.reset=this.reset.bind(this)
  }
  reset(){
    let { api, onReset, updateFunds } = this.props
    dataFuncs.reset(api).then((data)=>{
      onReset(data.data.stocks)
      dataFuncs.portfolioPromise(api).then(response=>updateFunds(response.funds))
   })
  }
    render(){
        return (
          <div className={CSS.Center}>
            <Button onClick={this.reset} variant="contained" color="primary">
              Reset
            </Button>
          </div>)
    }
}
  
const mapStateToProps = state => {
    return {
        api:state.stocks.api
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onReset: (availableStocks) => dispatch({type:stocksAction.RESET, availableStocks:availableStocks}),
      updateFunds: (funds) =>dispatch({type:stocksAction.UPDATE_FUNDS, funds:funds})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetBtn);