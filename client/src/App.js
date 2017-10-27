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
        this.getAllGarages();
    }

    componentWillUpdate() {
        this.getUserLocation();
    }

    constructor() {
        super();

        this.state = {
            garages: [],
            longitude: 0,
            latitude: 0,
            zipCode: '',
        }
        this.getUserLocation = this.getUserLocation.bind(this);
        this.searchZip = this.searchZip.bind(this);
        this.setMapOnZipSearch = this.setMapOnZipSearch.bind(this);
        this.getAllGarages = this.getAllGarages.bind(this);
        this.convertAddressToCoordinates = this.convertAddressToCoordinates.bind(this);
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition( position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }

    setMapOnZipSearch(lat, long) {
        this.setState({
            latitude: lat,
            longitude: long,
        });
    }

    getAllGarages() {
        fetch('http://localhost:8000/garages')
        .then( response => {
            return response.json();
        })
        .then( jsonBody => {
            this.convertAddressToCoordinates(jsonBody);
        });
    }

    convertAddressToCoordinates(addresses) {
        let apiKey = 'AIzaSyDpzlkHHmo0OJ-LpHIbogL1eXapd3R1N3o';
        let convertedAddresses = addresses.map( address => {
            let coordinates = {};
            let apiString = address.Address.replace(/ /g, '+');
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + apiString + '&key=' + apiKey)
            .then( response => {
                return response.json();
            })
            .then( jsonBody => {
                coordinates = {
                    lat: jsonBody.results[0].geometry.location.lat,
                    lng: jsonBody.results[0].geometry.location.lng,
                }
                this.setState({
                    garages: [...this.state.garages, coordinates],
                });
            });
        });
    }

    searchZip(event) {
        const zip = event.target.value;
        if(zip.length === 5) {
            fetch('http://maps.googleapis.com/maps/api/geocode/json?address=' + zip)
            .then( response => {
                return response.json();
            })
            .then( jsonBody => {
                let latitude = jsonBody.results[0].geometry.location.lat;
                let longitude = jsonBody.results[0].geometry.location.lng;
                this.setMapOnZipSearch(latitude, longitude);
            })
        }
        this.setState({
            zipCode: zip,
        });
    }

    render() {
        return (
            <div className="App">
                <NavBar handleZip={this.searchZip} value={this.state.zipCode} handleChange={this.searchZip}/>
                <Map id="testing"
                    isMarkerShown={true} 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: `98.5%`,  margin: `auto` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    schools={this.state.garages}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
