import React, { Component } from 'react';
import Header from './../Header';
import SearchBar from './../../containers/SearchBar';
import AvailableFunds from './../../containers/AvailableFunds'
import Portfolio from './../../containers/Portfolio';
import ResetBtn from './../../containers/ResetBtn'
import CSS from './App.css';

class App extends Component {
  render() {
    return (
      <div className={CSS.App}>
        <Header />
        <SearchBar />
        <AvailableFunds />
        <Portfolio />
        <ResetBtn/>
      </div>
    );
  }
}

export default App;
