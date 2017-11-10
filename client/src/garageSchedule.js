import React, { Component } from 'react';
import NavBar from './NavBar';

class GarageData extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
        }
        this.getGarageData = this.getGarageData.bind(this);
    }

    componentWillMount() {
        this.getGarageData();
    }

    getGarageData() {
        fetch('http://localhost:8000/garages/' + this.props.id)
            .then(response => {
                return response.json();
            })
            .then( jsonBody => {
                this.setState({
                    address: jsonBody.Address,
                });
            })
    }

    render() {
        return(
            <h1>{ this.state.address }</h1>
        );
    }
}

export default class GarageSchedule extends Component {
    render() {
        return(
            <div>
                <NavBar />
                <GarageData id={ this.props.match.params.number } />
            </div>
        );
    }
}