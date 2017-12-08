import React, { Component } from 'react';
import Auth from './Auth/Auth';
import './NavBar.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter,
    Redirect,
} from 'react-router-dom'


class AccountActions extends Component {
    render() {
        return (
            <ul className="dropdown-menu">
                {this.props.links.map(name => <li><a href="#">{name}</a></li>)}
            </ul>
        );
    }
}



class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            accountLinks: ['Testing', 'Link', 'Prop', 'Here'],
            zip: '',
        }
        this.goToListPageWithZip = this.goToListPageWithZip.bind(this);
    }

    goToListPageWithZip(e) {
        e.preventDefault();
        window.location = '/list/' + e.target.zip.value;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary" id="nav-thinner">
                <div className="navbar-brand" ><Link className="btn btn-primary btn-lg" to='/'>WePark</Link></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.goToListPageWithZip}>
                        <input className="form-control mr-sm-2" ref="zip" name="zip" placeholder="Search" type="text" onChange={this.props.handleChange} />
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                    <ul className="navbar-nav mr-auto ul-item">
                        <li className="nav-item li-item">
                            <div className="nav-link"><Link className="btn btn-primary" to="/list">List</Link></div>
                        </li>
                        <li className="nav-item li-item">
                            <div className="nav-link"><Link className="btn btn-primary" to="/creategarage">Create</Link></div>
                        </li>
                        <li className="nav-item li-item" id="item-align-left">
                            {Auth.isUserAuthenticated() ?
                                (
                                    <div className="nav-link"><Link className="btn btn-primary" to="/profile">{Auth.getEmail()}</Link></div>
                                ) :
                                (
                                    <div className="nav-link"><Link className="btn btn-primary" to="/login">Log In</Link></div>
                                )}
                        </li>
                        <li className="nav-item li-item">
                            {Auth.isUserAuthenticated() ?
                                (
                                    <div className="nav-link"><Link className="btn btn-primary" to="/logout">Log Out</Link></div>
                                ) :
                                (
                                    <div className="nav-link"><Link className="btn btn-primary" to="/signup">Sign Up</Link></div>
                                )}
                        </li>
                    </ul>

                </div>
            </nav >
        );
    }
}

export default NavBar;