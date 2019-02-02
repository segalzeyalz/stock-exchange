import React from 'react';
import CSS from './Header.css';
import Card from '@material-ui/core/Card';

//Static function for header - For not rendering it not unnecessary
const Header = () => {
  return <Card>
            <h1 className={CSS.title}>
              Stock Exchange
            </h1>
          </Card>
};
export default Header;