import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
    render() {
        return(
            <GoogleMap
                defaultZoom={8}
                defaultCenter={ {lat: -34.397, lng: 150.644} }
            >
            {this.props.isMarkerShown && <Marker position={ { lat: -34.397, lng: 150.644 } } />}
            </GoogleMap> 
        );
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 40.6314447, lng: -73.9566375 }}
    >
    {props.isMarkerShown && <Marker position={{ lat: 40.6314447, lng: -73.9566375 }} />}
    </GoogleMap>
))

export default MyMapComponent;