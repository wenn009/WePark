import React, { Component } from 'react';
import NavBar from './NavBar';
import './garageListStyles.css';

const EmptyGarageList = (props) => 
    <div className="panel panel-default garageWidth">
        <div className="panel-heading">
            <h3 className="panel-title">No Garages Near You</h3>
        </div>
        <div className="panel-body">
            No garages found!
        </div>
    </div>;

class GarageItem extends Component {    
    render() {
        return(
            <div className="panel panel-default garageWidth">
                <div className="panel-heading">
                    <h3 className="panel-title">{ this.props.garage.id }</h3>
                </div>
                <div className="panel-body">
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
            const garageObjects = jsonBody.map( (garage, index) => <GarageItem garage={garage} key={index} idNumber={garage.id} />);
            this.setState({
                garages: garageObjects,
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