import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import CSS from './Menu.scss';

const Menu = () => {
    return (
      <div className={CSS.Menu}>
        <Button><Link className={CSS.WithoutDecor} to="/">Portfolio</Link></Button>
        <Button><Link className={CSS.WithoutDecor} to="/funds">AvailableFunds</Link></Button>
      </div>
    )
  }
export default Menu;