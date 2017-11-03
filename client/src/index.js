import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App} />
            <Route exact path='/list' render={ () => <h1>Garage List</h1>} />
        </div>
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
