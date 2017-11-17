import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GarageForm from './GarageForm/GarageForm';
import registerServiceWorker from './registerServiceWorker';
//import Login from './logIn/loginPage';
//import Signup from './SignUp/signupPage';

import AppRoute from './AppRoute';

ReactDOM.render(<AppRoute />, document.getElementById('root'));

registerServiceWorker();
