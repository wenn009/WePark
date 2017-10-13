import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.js';
import MyMapComponent from './Map.js';

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
          <MyMapComponent id="testing"
            isMarkerShown={false} 
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
        <Footer />
      </div>
    );
  }
}

export default App;
