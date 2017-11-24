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
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <a href="#" className="thumbnail">
                                <img src="http://weknowyourdreams.com/images/house/house-04.jpg" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-9">
                            Address: { this.state.address } <br />
                            Price: { this.state.renting_price } <br />
                            Size: {this.state.size } <br />
                            Posted: { this.state.date } <br />
                            User: { this.state.user }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class TimeSlot extends Component {
    render() {
        return (
            <p>
                Start: { this.props.time.StartTime } <br />
                End: { this.props.time.EndTime }
            </p>
        );
    }
}

class GarageSchedule extends Component {
    constructor() {
        super();
        this.state = {
            timeSlots: [],
        }
        this.getTimeSlots = this.getTimeSlots.bind(this);
    }

    componentWillMount() {
        this.getTimeSlots();
    }

    getTimeSlots() {
        fetch('http://localhost:8000/timesheet/1/')
            .then( response => {
                return response.json();
            })
            .then( jsonBody => {
                jsonBody.timeSlots.map( (timeSlot) => <TimeSlot time={timeSlot} />);
                this.setState({
                    timeSlots: jsonBody.timeSlots.map( (timeSlot) => <TimeSlot time={timeSlot} />),
                });
            })
            .catch( () => {
                console.log("Error getting time slots");
            })
    }

    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Schedule List</h3>
                    { this.state.timeSlots }
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