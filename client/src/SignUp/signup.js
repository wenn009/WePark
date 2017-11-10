import React, { Component } from 'react';
import NavBar from '../NavBar';
import './signupStyles.css';

class SignUpForm extends Component {
    render() {
        return(
            <div className="panel panel-default" id="signUpForm">
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">First Name: </label>
                            <div className="col-sm-10">
                                <input type="text" name="FirstName" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Last Name: </label>
                            <div className="col-sm-10">
                                <input type="text" name="LastName" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Email: </label>
                            <div className="col-sm-10">
                                <input type="email" name="Email" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Password: </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default class SignUpPage extends Component {
    render() {
        return(
            <div id="signupPageDiv">
                <NavBar />
                <SignUpForm />
            </div>
        );
    }
}