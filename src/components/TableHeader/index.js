import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Static function for TableHeders - For not rendering not unnecessary
//This component render as header all parameters needed. can be reusable, and filter
const TableHeader = (props) => {
  let { onFilter, filters, type } = props;
  return(<TableHead>
    <TableRow>
        {filters.map((elem)=>{
            return <TableCell key={elem.item} onClick={()=>onFilter(elem.item)}>{elem.name}</TableCell>
        })}
       {type==='AvailableFunds' && <TableCell>Buy</TableCell>}
       {type==='Portfolio' && <TableCell>Sell</TableCell>}
    </TableRow>
   </TableHead>)
};
export default TableHeader;