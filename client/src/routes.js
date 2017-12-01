import React from 'react'
import App from './App';
import Auth from './Auth/Auth';
import NavBar from './NavBar';
import Login from './logIn/loginPage';
import Signup from './SignUp/signupPage';
import GarageListContainer from './garageList';
import GarageSchedule from './Garages/garageSchedule';
import Logout from './LogOut/LogOutPage';
import GarageForm from './GarageForm/GarageForm';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'


export default () => (
  <Router>
    <Switch >
      <Route exact path='/' component={App} />
      <Route exact path='/list' component={GarageListContainer} />
      <Route path='/list/:zip' component={GarageListContainer} />
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={Signup} />
      <Route path='/createGarage' exact component={GarageForm} />
      <Route path='/garage/:number' component={GarageSchedule} />
      <Route path ='/logout' component={Logout} />
    </Switch>
  </Router>
)

