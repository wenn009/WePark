import React, { Component } from 'react';
import Auth from './Auth/Auth';
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
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div className="navbar-brand" ><Link to='/'>WePark</Link></div>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left" onSubmit={this.props.searchZip}>
                            <div className="form-group">
                                <input type="text" className="form-control" ref="zip" placeholder="Search" onChange={this.props.handleChange}/>
                            </div>
                            {/*<button type="submit" className="btn btn-default">Submit</button>*/}
                        </form>
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/list">List</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {Auth.isUserAuthenticated() ?
                                (
                                    <li className="dropdown">{Auth.getEmail()}</li>
                                ) :
                                (
                                    <li className="dropdown"><Link to="/login">Log in</Link></li>
                                )}
                            {Auth.isUserAuthenticated() ?
                                (
                                    <li className="dropdown"><Link to="/logout">Log out</Link></li>
                                ) :
                                (
                                    <li className="dropdown"><Link to="/signup">Sign up</Link></li>
                                )}


                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
//<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account <span className="caret"></span></a>
//<AccountActions links={this.state.accountLinks} />
/* 
*/

