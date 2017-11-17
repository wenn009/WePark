import React, { Component } from 'react';
import NavBar from '../NavBar';

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
        fetch('http://localhost:8000/garages/' + this.props.idNumber)
            .then(response => {
                return response.json();
            })
            .then( jsonBody => {
                this.setState({
                    address: jsonBody.Address,
                    renting_price: jsonBody.Renting_Price,
                    size: jsonBody.Size,
                    date: jsonBody.createdAt,
                    user: jsonBody.UserId,
                });
            })
    }

    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <a href="#" className="thumbnail">
                                    <img src="http://weknowyourdreams.com/images/house/house-04.jpg" className="img-fluid" />
                                </a>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-9">
                                Address: { this.state.address } <br />
                                Price: { this.state.renting_price } <br />
                                Size: {this.state.size } <br />
                                Posted: { this.state.date } <br />
                                User: { this.state.user }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class GarageSchedule extends Component {
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Schedule List</h3>
                    <h5>The availability will show here</h5>
                </div>
            </div>
        );
    }
}

export default class GarageScheduleContainer extends Component {
    render() {
        return(
            <div>
                <NavBar/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <GarageSchedule />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <GarageData idNumber={ this.props.match.params.number } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}