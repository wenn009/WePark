import React, { Component } from 'react';
import './footerStyles.css';

export default class Footer extends Component {
    render() {
        const footerStyle = {
            marginTop: "50px",
            backgroundColor: "#2C3E50",
            color: "white",
            padding: "25px",
            textAlign: "center",
        }
        return (
            <div className="container-fluid" style={footerStyle}>
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <h4>Contact Us</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <a href="https://github.com/wenn009/WePark" target="_blank"><i className="fa fa-github fa-5x changeColorOnHover" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-sm-4">
                        <a href="#"><i className="fa fa-linkedin-square fa-5x changeColorOnHover" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-sm-4">
                        <a href="#"><i className="fa fa-envelope fa-5x changeColorOnHover" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <p>&copy;2017 Copyright Text</p>
                    </div>
                </div>
            </div>
        );
    }
}