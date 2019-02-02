import React, { Component } from 'react';
import Header from './../Header';
import SearchBar from './../../containers/SearchBar';
import AvailableFunds from './../AvailableFunds';
import Portfolio from './../../containers/Portfolio';
import ResetBtn from './../ResetBtn'
import CSS from './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
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
