import React, { Component } from 'react';
import NavBar from './NavBar';
import './garageListStyles.css';
import ProgressBar from './ProgressBar';
import Footer from './Footer/Footer';

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

class GarageItem2 extends Component {
    render() {
        return (
            <div className="col-lg-4" style={{paddingTop: '10px'}}>
            <div className="card">
                <h3 className="card-header"></h3>
                <div className="card-body">
                    <h5 className="">Username Here</h5>
                    <h6 className="card-subtitle text-muted">${ this.props.garage.Renting_Price }</h6>
                </div>
                <img style={{height: '200px', width: '100%', display: 'block'}} src="http://weknowyourdreams.com/images/house/house-04.jpg" alt="Card image" />
                <div className="card-body">
                    <p className="card-text">
                        Address: { this.props.garage.Address } <br />
                        Size: { this.props.garage.Size }
                    </p>
                    <a href={'/garage/'+this.props.idNumber} className="card-link">View</a>
                </div>
                <div className="card-footer text-muted">
                    { new Date(this.props.garage.createdAt).toDateString() }
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
            progressBar: 0,
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
                progressBar: 25,
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
                    progressBar: 50,
                });
            })
            .then ( () => {
                this.getAllGarages();
            })
            .catch( () => {
                console.log('Error getting zip code');
                this.setState( () => {
                    return {
                        progressBar: 100,
                    }
                })
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
        fetch('/garages/searchResults', postData)
        .then( response => {
            return response.json();
        })
        .then( jsonBody => {
            const garageObjects = jsonBody.map( (garage, index) => <GarageItem2 garage={garage} key={index} idNumber={garage.id} />);
            this.setState(() => {
                return {
                    garages: garageObjects,
                    progressBar: 100,
                }
            })
        })
        .catch( () => {
            console.log('Error getting garages');
            this.setState( () => {
                return {
                    progressBar: 100,
                }
            })
        })
    }

    render() {
        let garageData = null;
        if (this.state.progressBar < 100) {
            let progress = this.state.progressBar + "%"
            garageData = <ProgressBar status={progress} />
            return (
                <div>
                    <NavBar />
                    <ProgressBar status={progress} />
                    {/*<Footer />*/}
                </div>
            );
        } else if(this.state.garages.length === 0) {
            garageData = <EmptyGarageList />
        } else {
            garageData = this.state.garages;
        }

        return(
            <div >
                <NavBar />
                <div className="container">
                    <div className="row">
                        { garageData }
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}