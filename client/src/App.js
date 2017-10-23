import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar.js';
import Map from './Map.js';

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
    componentWillMount() {
        this.getUserLocation();
    }

    componentWillUpdate() {
        this.getUserLocation();
    }

    constructor() {
        super();

        this.state = {
            locations: [
                //Baruch College:
                { lat: 40.740199, lng: -73.983373,},
                //Brooklyn College:
                { lat: 40.631439, lng: -73.954450,},
                //CCNY:
                { lat: 40.820043, lng: -73.949272,},
                //CSI:
                { lat: 40.601813, lng: -74.148491,},
                //Hunter:
                { lat: 40.768534, lng: -73.964630,},
                //John Jay:
                { lat: 40.770388, lng: -73.988498,},
                //Lehman:
                { lat: 40.873316, lng: -73.894139,},
                //City Tech:
                { lat: 40.695530, lng: -73.987457,},
                //Queens College:
                { lat: 40.737973, lng: -73.817240,},
                //York College:
                { lat: 40.701926, lng: -73.795637,},
            ],
            longitude: 0,
            latitude: 0,
            zipCode: '',
        }
        this.getUserLocation = this.getUserLocation.bind(this);
        this.searchZip = this.searchZip.bind(this);
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition( position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }

    searchZip(event) {
        event.preventDefault();
        const zip = event.target.value;
        this.setState({
            zipCode: zip,
        });
        console.log(event);
    }

    render() {
        return (
            <div className="App">
                <NavBar handleZip={this.searchZip} value={this.state.zipCode}/>
                <Map id="testing"
                    isMarkerShown={true} 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: `98.5%`,  margin: `auto` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    schools={this.state.locations}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
