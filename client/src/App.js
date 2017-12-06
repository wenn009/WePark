import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar.js';
import Map from './Map.js';
import ProgressBar from './ProgressBar';
import Footer from './Footer/Footer';

class Jumbo extends Component {
    render() {
        const instructionStyle = {
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto",
        }
        return (
            <div className="jumbotron">
                <h1 className="display-3">Welcome to WePark!</h1>
                <p>Find private parking garages near you</p>
                <div style={instructionStyle}>
                    <ul style={{textAlign: "left"}}>
                        <li>Click on any of the markers on the map to view more info &amp; reserve</li>
                        <li>Click the 'List' button to view the garages near you in a list format</li>
                        <li>Input a zip code into the search bar above to view garages in another area</li>
                    </ul>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.props.handleJumbotron}>Close</button>
          </div>
        );
    }
}

class App extends Component {
    componentDidMount() {
        this.getUserLocation();
        this.getAllGarages();
    }

    constructor() {
        super();

        this.state = {
            garages: [],
            longitude: 0,
            latitude: 0,
            zipCode: '',
            showJumbotron: true,
        }
        this.getUserLocation = this.getUserLocation.bind(this);
        this.searchZip = this.searchZip.bind(this);
        this.setMapOnZipSearch = this.setMapOnZipSearch.bind(this);
        this.getAllGarages = this.getAllGarages.bind(this);
        this.convertAddressToCoordinates = this.convertAddressToCoordinates.bind(this);
        this.closeJumbotron = this.closeJumbotron.bind(this);
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition(position => {
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
            .then(response => {
                return response.json();
            })
            .then(jsonBody => {
                this.convertAddressToCoordinates(jsonBody);
            });
    }

    convertAddressToCoordinates(addresses) {
        let apiKey = 'AIzaSyDpzlkHHmo0OJ-LpHIbogL1eXapd3R1N3o';
        let convertedAddresses = addresses.map(address => {
            let coordinates = {
                id: address.id,
                lat: 0,
                lng: 0,
            };
            let apiString = address.Address.replace(/ /g, '+');
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + apiString + '&key=' + apiKey)
                .then(response => {
                    return response.json();
                })
                .then(jsonBody => {
                    coordinates.lat = jsonBody.results[0].geometry.location.lat;
                    coordinates.lng = jsonBody.results[0].geometry.location.lng;
                    this.setState({
                        garages: [...this.state.garages, coordinates],
                    });
                });
        });
    }

    searchZip(event) {
        const zip = event.target.value;
        if (zip.length === 5) {
            fetch('http://maps.googleapis.com/maps/api/geocode/json?address=' + zip)
                .then(response => {
                    return response.json();
                })
                .then(jsonBody => {
                    let latitude = jsonBody.results[0].geometry.location.lat;
                    let longitude = jsonBody.results[0].geometry.location.lng;
                    this.setMapOnZipSearch(latitude, longitude);
                })
        }
        this.setState({
            zipCode: zip,
        });
    }

    closeJumbotron() {
        this.setState( () => {
            return {
                showJumbotron: false,
            };
        });
    }

    render() {
        return (
            <div className="App">
                <NavBar handleZip={this.searchZip} value={this.state.zipCode} handleChange={this.searchZip} />
                {this.state.showJumbotron && <Jumbo handleJumbotron={this.closeJumbotron} /> }
                <Map id="testing"
                    isMarkerShown={true}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: `98.5%`, margin: `auto` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    garages={this.state.garages}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
