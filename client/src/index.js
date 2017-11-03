import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppRoute from './AppRoute';

ReactDOM.render(<AppRoute />, document.getElementById('root'));
//ReactDOM.render(<SignupPage />, document.getElementById('root'));


registerServiceWorker();
