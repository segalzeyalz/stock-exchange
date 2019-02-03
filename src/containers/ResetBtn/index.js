import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import * as stocksAction from './../../constants/stockActions';
import axios from 'axios';
import { connect } from 'react-redux';

class ResetBtn extends Component {
  constructor(){
    super();
    this.reset=this.reset.bind(this)
  }
  reset(){
    let { api } = this.props
    axios.delete(`${api}/management`)
    .then(axios.post(`${api}/market/search`,{
        "searchString": ""
    }
  ).then((data)=>{
  })
)
  }
    render(){
        return (
          <Button onClick={this.reset} variant="contained" color="primary">
            Reset
          </Button>)
    }
}
  
const mapStateToProps = state => {
    return {
        api:state.stocks.api
    }
}

const mapDispatchToProps = dispatch => {
    return {
      reset: (stocks) => dispatch({type:stocksAction.RESET, stocks:stocks})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetBtn);