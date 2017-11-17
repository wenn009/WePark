import React, { PropTypes } from 'react';
import NavBar from '../NavBar';
import Auth from '../Auth/Auth';

const LogOutPage = () => (
    <div>
        {Auth.deauthenticateUser()}
        <h1> You are successfully logged out </h1>
        <p > Go back to Home?  <a href="/">Home</a></p>
    </div>
)
    //{Auth.deauthenticateUser()}
   


export default LogOutPage;