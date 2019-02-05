import React, { Component } from 'react';
import Header from './../Header';
import Portfolio from './../../containers/Portfolio';
import AvailableFunds from './../../containers/AvailableFunds';
import Popup from './../../containers/popup';
import Menu from './../Menu';
import ResetBtn from './../../containers/ResetBtn';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CSS from './App.css';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className={CSS.App}>
            <Header />
            <Menu/>
            <Popup/>
            <Switch>
            <Route exact path="/" component={Portfolio}/>
            <Route exact path="/funds" component={AvailableFunds}/>
          </Switch>
          <ResetBtn/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
