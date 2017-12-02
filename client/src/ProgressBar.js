import React, { Component } from 'react';

export default class ProgressBar extends Component {
    render() {
        const progressStyles = {
            margin: "50px",
        }
        return (
            <div className="progress" style={progressStyles}>
                <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: this.props.status}}></div>
            </div>
        );
    }
}