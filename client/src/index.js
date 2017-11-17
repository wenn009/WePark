import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GarageForm from './GarageForm/GarageForm';
import registerServiceWorker from './registerServiceWorker';

import AppRoute from './AppRoute';

//ReactDOM.render(<AppRoute />, document.getElementById('root'));

import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import GarageListContainer from './garageList';
import GarageSchedule from './Garages/garageSchedule';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App} />
            <Route exact path='/list' component={GarageListContainer} />
            <Route path='/createGarage' exact component={GarageForm}/>
            <Route path='/garage/:number' component={GarageSchedule} />
        </div>
    </BrowserRouter>, 
    document.getElementById('root')
);

registerServiceWorker();
