import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import AppRoute from './AppRoute';

//ReactDOM.render(<AppRoute />, document.getElementById('root'));

import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import GarageListContainer from './garageList';
import GarageSchedule from './Garages/garageSchedule';
import SignUpPage from './SignUp/signup';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App} />
            <Route exact path='/list' component={GarageListContainer} />
            <Route path='/garage/:number' component={GarageSchedule} />
            <Route exact path='/signup' component={SignUpPage} />
        </div>
    </BrowserRouter>, 
    document.getElementById('root')
);

registerServiceWorker();
