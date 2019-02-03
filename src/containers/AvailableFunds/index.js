import React, { Component } from 'react';
import CSS from './AvailableFunds.css';
import * as actionTypes from './../../constants/stockActions';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SvgIcon from '@material-ui/core/SvgIcon';

class AvailableFunds extends Component {
    render(){

        let { stocks } = this.props;
        return (<div className={CSS.AvailableFunds}>
                <h2>My AvailableFunds</h2>
                   <Table>
                       <TableHead>
                           <TableCell>Symbol</TableCell>
                           <TableCell>Name</TableCell>
                           <TableCell>Price</TableCell>
                           <TableCell>Buy</TableCell>
                       </TableHead>
                     <TableBody>
                       {stocks.map(elem=> {
                           return <TableRow>
                                    <TableCell>{elem.symbol}</TableCell>
                                    <TableCell>{elem.name}</TableCell>
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
        stocks:state.stocks.filteredStocks
    }
}

export default connect(mapStateToProps, null)(AvailableFunds);