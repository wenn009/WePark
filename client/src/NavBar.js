import React, { Component } from 'react';
import Auth from './Auth/Auth';
import './NavBar.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
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
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="navbar-brand" ><Link to='/'>WePark</Link></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.props.searchZip}>
                        <input className="form-control mr-sm-2" ref="zip" placeholder="Search" type="text" onChange={this.props.handleChange} />
                        {/*<button type="submit" className="btn btn-default">Submit</button>*/}
                    </form>
                    <ul className="navbar-nav mr-auto ul-item">
                        <li className="nav-item li-item">
                            <div className="nav-link"><Link to="/list">List</Link></div>
                        </li>
                        <li className="nav-item li-item">
                            {Auth.isUserAuthenticated() ?
                                (
                                    <div className="nav-link"><Link to="/profile">{Auth.getEmail()}</Link></div>
                                ) :
                                (
                                    <div className="nav-link"><Link to="/login">Log In</Link></div>
                                )}
                        </li>
                        <li className="nav-item li-item">
                            {Auth.isUserAuthenticated() ?
                                (
                                    <div className="nav-link"><Link to="/logout">Log Out</Link></div>
                                ) :
                                (
                                    <div className="nav-link"><Link to="/signup">Sign Up</Link></div>
                                )}
                        </li>
                    </ul>

                </div>
            </nav >
        );
        /*return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" placeholder="Search" type="text"/>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
          </div>
        );*/
    }
}

export default NavBar;
//<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account <span className="caret"></span></a>
//<AccountActions links={this.state.accountLinks} />
/* 
<div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                       
                    </div>
*/

