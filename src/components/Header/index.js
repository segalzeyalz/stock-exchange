import React from 'react';
import CSS from './Header.scss';

//Static function for header - For not rendering it not unnecessary
const Header = () => {
  //Only title, static
  return(<h1 className={CSS.title}>Stock Exchange</h1>)
};
export default Header;