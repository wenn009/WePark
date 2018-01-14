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
        fetch('/garages/' + this.props.idNumber)
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

class TimeModal extends Component {
    render() {
        return (
            <div className="modal">
                testing
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Reserve Time</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body goes here</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success">Reserve</button>
                            <button type="button" className="btn btn-secondary">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class AmPmRadiobuttons extends Component {
    render() {
        return (
            <div className="radio form-check form-check-inline">
                <label>
                    <input type="radio" name="AmOrPm" id="value1" value="am"/>
                    AM
                </label>
                <label>
                    <input type="radio" name="AmOrPm" id="value2" value="pm"/>
                    PM
                </label>
            </div>
        );
    }
}

class TimeSelector extends Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor="exampleSelect1">{this.props.label}</label>
                <select className="form-control" id="exampleSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
            </div>
        );
    }
}

class ReserveInput extends Component {
    render() {
        return (
            <form className="form-inline">
                <TimeSelector label="Start Time: " />
                <AmPmRadiobuttons />
                <TimeSelector label="End Time: " />
                <AmPmRadiobuttons />
                <button type="button" className="btn btn-success">Submit</button>
            </form>
        );
    }
}

class TimeSlot extends Component {
    render() {
        return (
            <a href="#" className="list-group-item list-group-item-action active">
                {this.props.start} - {this.props.end}
            </a>
        );
    }
}

class GarageSchedule extends Component {
    constructor() {
        super();
        this.state = {
            timeSlots: [],
            isModalOpen: false,
            buttonLabel: 'Reserve Time',
        }
        this.getTimeSlots = this.getTimeSlots.bind(this);
        this.toggleReserve = this.toggleReserve.bind(this);
    }

    componentWillMount() {
        this.getTimeSlots();
    }

    toggleReserve() {
        this.setState(() => {
            return {
                isModalOpen: !this.state.isModalOpen,
                buttonLabel: this.state.buttonLabel !== 'Reserve Time' ? 'Reserve Time' : 'Hide',
            }
        });
    }

    getTimeSlots() {
        fetch('/timesheet/5/')
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
                    return dateObject;
                })
                let timeSlotArray = dates.map( (date, index) => <TimeSlot start={date.StartTime} end={date.EndTime} key={index} />);
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
                    <div className="list-group">
                        { this.state.timeSlots }
                    </div>
                    <button onClick={this.toggleReserve} type="button" className="btn btn-success">{this.state.buttonLabel}</button>
                    { this.state.isModalOpen && <ReserveInput /> }
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