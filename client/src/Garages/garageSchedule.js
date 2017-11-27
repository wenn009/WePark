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
            <div className="card border-primary">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-5">
                            <a href="#" className="thumbnail">
                                <img src="http://weknowyourdreams.com/images/house/house-04.jpg" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-7">
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
                Start: { this.props.start } <br />
                End: { this.props.end }
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
                let dates = jsonBody.timeSlots.map( (timeSlot) => {
                    let starting = new Date(timeSlot.StartTime).toLocaleTimeString();
                    let ending = new Date(timeSlot.EndTime).toLocaleTimeString();
                    let dateObject = {
                        StartTime: starting,
                        EndTime: ending,
                    }
                    console.log(dateObject);
                    return dateObject;
                })
                let timeSlotArray = dates.map( (timeSlot, index) => <TimeSlot start={timeSlot.StartTime} end={timeSlot.EndTime} key={index} />);
                this.setState({
                    timeSlots: timeSlotArray,
                });
            })
            .catch( () => {
                console.log("Error getting time slots");
            })
    }

    render() {
        return(
            <div className="card border-primary">
                <div className="card-body">
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