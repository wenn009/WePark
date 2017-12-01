import React, { PropTypes } from "react";
import NavBar from '../NavBar';
import Auth from '../Auth/Auth';
import { BrowserRouter as router, Redirect } from 'react-router-dom';

import LoginForm from "./loginForm";

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            errors: {},
            isLogIn: false,
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    // Pre-submission.
    processForm(event) {
        event.preventDefault();

        const email = this.state.user.email;
        const password = this.state.user.password;

        //TO DO Post login data.
        console.log(email);
        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            if (response.status === 200) {
                this.setState({ errors: {} });
                console.log('logged in!!')

                response.json().then(json => {
                    console.log(json);
                    Auth.authenticateUser(json.token, email);
                    //this.forceUpdate();
                    if(Auth.isUserAuthenticated()){
                        this.setState({isLogIn: true});
                    }
                })
            
            } else {
                console.log('Login failed');
                response.json().then(json => {
                    const errors = json.errors ? json.errors : {};
                    errors.summary = json.message;
                    this.setState({ errors });
                    console.log(this.state.errors);
                });
            }
        })

    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({ user });
    }

    render() {

        if (this.state.isLogIn) {
            return <Redirect to='/' push={true} />
        } else {
            return (
                <div>
                    <NavBar />

                    <LoginForm
                        onSubmit={this.processForm}
                        onChange={this.changeUser}
                        errors={this.state.errors}
                        user={this.state.user}
                    />
                </div>
            );
        }
    }
}

export default LoginPage;
