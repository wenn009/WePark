import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import LoginPage from './logIn/loginPage';
import SignupPage from './SignUp/signupPage';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<SignupPage />, document.getElementById('root'));
registerServiceWorker();
