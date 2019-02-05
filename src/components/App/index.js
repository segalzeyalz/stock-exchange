import React, { Component } from 'react';
import Header from './../Header';
import Portfolio from './../../containers/Portfolio';
import AvailableFunds from './../../containers/AvailableFunds';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Popup from './../../containers/popup'
import CSS from './App.css';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className={CSS.App}>
            <Header />
            <Popup/>
            <Switch>
            <Route exact path="/" component={Portfolio}/>
            <Route exact path="/funds" component={AvailableFunds}/>
          </Switch>

          </div>
        </BrowserRouter>
    );
  }
}

export default App;
