import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.js';

class Footer extends Component {
  render() {
      return(
          <footer>
              WePark Inc.
          </footer>
      );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
          This is where the map goes
        <Footer />
      </div>
    );
  }
}

export default App;
