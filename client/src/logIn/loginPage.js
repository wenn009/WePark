import React, { PropTypes } from 'react';
//import Auth from '../Auth/Auth';
import NavBar from '../NavBar';
import Auth from '../Auth/Auth';

import LoginForm from './loginForm';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            errors: {},
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


export default LoginPage;