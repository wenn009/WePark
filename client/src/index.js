import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import Login from './logIn/loginPage';
//import Signup from './SignUp/signupPage';

import AppRoute from './AppRoute';

ReactDOM.render(<AppRoute />, document.getElementById('root'));

/*import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import GarageListContainer from './garageList';
import GarageSchedule from './Garages/garageSchedule';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/list' component={GarageListContainer} />
            <Route path='/login' exact component={Login}/>
            <Route path='/signup' exact component={Signup}/>
            <Route path='/garage/:number' component={GarageSchedule} />
        </Switch>
    </BrowserRouter>, 
    document.getElementById('root')
);*/

registerServiceWorker();
