import React, { Component } from 'react';

class AccountActions extends Component{
    render() {
        return(
            <ul className="dropdown-menu">
                { this.props.links.map( name => <li><a href="#">{name}</a></li>) }
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
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">WePark</a>
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
                                <a className="nav-link" href="#">List</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account <span className="caret"></span></a>
                                <AccountActions links={this.state.accountLinks} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;