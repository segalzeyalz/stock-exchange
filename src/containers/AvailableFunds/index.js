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
        let { stocks, onFilter } = this.props;
        console.log(onFilter)
        return (<div className={CSS.AvailableFunds}>
                <h2>My AvailableFunds</h2>
                   <Table>
                       <TableHead>
                           <TableCell onClick={()=>onFilter("symbol")}>Symbol</TableCell>
                           <TableCell onClick={()=>onFilter("name")}>Name</TableCell>
                           <TableCell onClick={()=>onFilter("currentPrice")}>Price</TableCell>
                           <TableCell>Buy</TableCell>
                       </TableHead>
                     <TableBody>
                       {stocks.map(elem=> {
                           return <TableRow>
                                    <TableCell>{elem.symbol}</TableCell>
                                    <TableCell>{elem.name}</TableCell>
                                    <TableCell>{elem.currentPrice}</TableCell>
                                    <TableCell>
                                        <SvgIcon>
                                            <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/>
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
        stocks:state.stocks.filteredStocks
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onFilter: (name) => dispatch({type:actionTypes.SORT_AVAILABLE_STOCKS, filterBy:name}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableFunds);