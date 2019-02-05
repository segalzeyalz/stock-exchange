import React, { Component } from 'react';
import AvailableFunds from './../../containers/AvailableFunds';

import { Router, Route, hashHistory } from 'react-router';

class Menu extends Component {
render(){
    return (
    <Router history={hashHistory}>
      <Route path="/" component={AvailableFunds}/>
    </Router> )
    }
}

export default Menu;
