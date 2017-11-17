import React, { PropTypes } from 'react';
//import Auth from '../Auth/Auth';
import NavBar from '../NavBar';

import SignupForm from './signupForm';

class SignupPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: '',
                password: '',
                retypePassword: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                userType: 'Regular'
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    // Pre-submission.
    processForm(event) {
        event.preventDefault();
        const errors = {};
        const email = this.state.user.email;
        const password = this.state.user.password;
        const firstName = this.state.user.firstName;
        const lastName = this.state.user.lastName;
        const address = this.state.user.address;
        const userType = this.state.user.userType;
        const phoneNumber = this.state.user.phoneNumber;
        const retypePassword = this.state.user.retypePassword;

        if (password !== retypePassword) {
            errors.password = 'password is not match';
        }

        if (email === '') {
            errors.email = 'please enter an email';
        }
        this.setState({ errors });

        //if (this.state.errors === {}) {
        fetch('http://localhost:8000/auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                userType: userType,
                phoneNumber: phoneNumber,
            })

        }).then(response => {
            if (response.status === 200) {
                this.setState({ errors: {} });
                console.log("signed up!!!")
            } else {
                response.json().then(json => {
                    console.log(json);
                    const errors = json.errors ? json.errors : {};
                    errors.summary = json.message;
                    this.setState({ errors });
                });
            }
        })
        // }

        //TO DO Post sign up data.
        console.log(this.state.user);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({ user });
    }

    render() {
        return (
            <div>
                <NavBar />
                <SignupForm
                    onSubmit={this.processForm}
                    onChange={this.changeUser}
                    errors={this.state.errors}
                    user={this.state.user}
                />
            </div>
        );
    }
}


export default SignupPage;