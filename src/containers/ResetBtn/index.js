import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CSS from './Btn.css';
import * as stocksAction from './../../constants/stockActions';
import axios from 'axios';
import { connect } from 'react-redux';

class ResetBtn extends Component {
  constructor(){
    super();
    this.reset=this.reset.bind(this)
  }
  reset(){
    let { api, onReset } = this.props
    axios.delete(`${api}/management`)
    .then(axios.post(`${api}/market/search`,{
        "searchString": ""
    }
  ).then((data)=>{
    onReset(data.data.stocks)
  })
)
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetBtn);