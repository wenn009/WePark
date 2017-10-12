import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.js';

class Footer extends Component {
  render() {
      return(
          <footer id="foot">
              WePark Inc.
          </footer>
      );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <NavBar />
          This is where the map goes
        <Footer />
      </div>
    );
  }
}

export default App;
