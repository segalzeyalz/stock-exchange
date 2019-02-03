import React from 'react';
import CSS from './Header.css';

//Static function for header - For not rendering it not unnecessary
const PurchaseData = () => {
  //Only title, static
  return(<h1 className={CSS.title}>Stock Exchange</h1>)
};
export default PurchaseData;