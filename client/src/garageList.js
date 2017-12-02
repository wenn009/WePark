import React, { Component } from 'react';
import NavBar from './NavBar';
import './garageListStyles.css';

const EmptyGarageList = (props) => 
    <div className="card border-primary garageWidth">
        <div className="card-body">
            <h3 className="panel-title">No Garages Near You</h3>
            No garages found!
        </div>
    </div>;

class GarageItem extends Component {    
    render() {
        return(
            <div className="card border-primary garageWidth">
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <a href={'/garage/'+this.props.idNumber} className="thumbnail">
                                    <img src="http://weknowyourdreams.com/images/house/house-04.jpg" className="img-fluid" />
                                </a>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-9">
                                Address: { this.props.garage.Address } <br />
                                Renting Price: { this.props.garage.Renting_Price } <br />
                                Size: { this.props.garage.Size } <br />
                                Date Listed: { this.props.garage.createdAt } <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class GarageListContainer extends Component {
    constructor() {
        super();
        this.state = {
            garages: [],
            longitude: 0,
            latitude: 0,
            zip: '',
        }
        this.getAllGarages = this.getAllGarages.bind(this);
        this.getUserLocation = this.getUserLocation.bind(this);
        this.getCurrentZip = this.getCurrentZip.bind(this);
    }
    
    componentDidMount() {
        if (this.props.match.params.zip) {
            console.log('with zip param');
            this.getAllGarages();
        } else {
            console.log('without zip param');
            this.getUserLocation();
        }
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition( position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            this.getCurrentZip();
        });
    }

    getCurrentZip() {
        const apiKey = 'AIzaSyDpzlkHHmo0OJ-LpHIbogL1eXapd3R1N3o';
        let coordinateKey = this.state.latitude + ',' + this.state.longitude;
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coordinateKey + '&key=' + apiKey;
        fetch(url)
            .then( response => {
                return response.json();
            })
            .then( jsonBody => {
                let zipArray = jsonBody.results[0].address_components.filter( comp => {
                    if(comp.types.includes('postal_code') === true) {
                        return comp;
                    }
                });
                this.setState({
                    zip: zipArray[0].long_name,
                });
            })
            .then ( () => {
                this.getAllGarages();
            })
            .catch( () => {
                console.log('Error getting zip code');
            })
    }

    getAllGarages() {
        let postData = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Zip: this.props.match.params.zip ? this.props.match.params.zip : this.state.zip
            })
        };
        fetch('http://localhost:8000/garages/searchResults', postData)
        .then( response => {
            return response.json();
        })
        .then( jsonBody => {
            const garageObjects = jsonBody.map( (garage, index) => <GarageItem garage={garage} key={index} idNumber={garage.id} />);
            this.setState(() => {
                return {
                    garages: garageObjects,
                }
            })
        })
        .catch( () => console.log('Error getting garages'));
    }

    render() {
        let garageData = null;
        if(this.state.garages.length === 0) {
            garageData = <EmptyGarageList />
        } else {
            garageData = this.state.garages;
        }

        return(
            <div id="listPageDiv">
                <NavBar />
                { garageData }
            </div>
        );
    }
}