import React, { Component } from 'react';
import './footerStyles.css';

export default class Footer extends Component {
    render() {
        const footerStyle = {
            marginTop: "50px",
            backgroundColor: "#2C3E50",
            color: "#20c997",
            padding: "25px",
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
                        <a href="https://github.com/wenn009/WePark" target="_blank"><i class="fa fa-github fa-5x changeColorOnHover" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-sm-4">
                        <a href="#"><i class="fa fa-linkedin-square fa-5x changeColorOnHover" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-sm-4">
                        <a href="#"><i class="fa fa-envelope fa-5x changeColorOnHover" aria-hidden="true"></i></a>
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