import React, { Component } from 'react';
import NavBar from './NavBar';
import './garageListStyles.css';

class GarageItem extends Component {    
    render() {
        return(
            <div className="panel panel-default garageWidth">
                <div className="panel-heading">
                    <h3 className="panel-title">{ this.props.garage.id }</h3>
                </div>
                <div className="panel-body">
                    Address: { this.props.garage.Address } <br />
                    Renting Price: { this.props.garage.Renting_Price } <br />
                    Size: { this.props.garage.Size } <br />
                    Date Listed: { this.props.garage.createdAt } <br />
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
        }
        this.getAllGarages = this.getAllGarages.bind(this);
    }

    componentWillMount() {
        this.getAllGarages();
    }

    getAllGarages() {
        fetch('http://localhost:8000/garages')
        .then( response => {
            return response.json();
        })
        .then( jsonBody => {
            jsonBody.forEach( garage => console.log(garage));
            const garageObjects = jsonBody.map( garage => <GarageItem garage={garage} />);
            console.log(garageObjects);
            this.setState({
                garages: garageObjects,
            })
        })
        .catch( () => console.log('Error getting garages'));
    }

    render() {
        return(
            <div id="listPageDiv">
                <NavBar />
                { this.state.garages }
            </div>
        );
    }
}