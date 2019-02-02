import React, { Component } from 'react';
import * as actionTypes from './../../constants/UIActions';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CSS from './Portfolio.css';

class Portfolio extends Component {
    render(){
        let { stocks } = this.props;
        return (<div className={CSS.Portfolio}>
                <h2>My Portfolio</h2>
                   <Table>
                       <TableHead>
                           <TableCell>symbol</TableCell>
                           <TableCell>name</TableCell>
                           <TableCell>startOfCommerce</TableCell>
                           <TableCell>currentPrice</TableCell>
                           <TableCell>sell</TableCell>
                           <TableCell>sell</TableCell>
                           hand-holding-usd
                       </TableHead>
                     <TableBody>
                       {stocks.map(elem=> {
                           return <TableRow>
                                    <TableCell>{elem.symbol}</TableCell>
                                    <TableCell>{elem.name}</TableCell>
                                    <TableCell>{elem.startOfCommerce}</TableCell>
                                    <TableCell>{elem.currentPrice}</TableCell>
                                 </TableRow>
                        }
                    )}</TableBody>
                   </Table>
                </div>)
    }
}
  
const mapStateToProps = state => {
    return {
        stocks:state.stocks.stocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onOpen: () => dispatch({type:actionTypes.OPEN_POPUP}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);