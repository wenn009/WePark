import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

function testingFunction(url) {
    window.location = url;
}

const Map = withScriptjs(withGoogleMap( (props) =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: props.latitude, lng: props.longitude }}
        center={{ lat: props.latitude, lng: props.longitude }}
    >
    { props.garages.map( (garage, index) => {
        let urlPath = '/garage/' + garage.id;
        return <Marker position={{ lat: garage.lat, lng: garage.lng }} 
                    key={index}
                    onClick={ () => testingFunction(urlPath) }
                />
    })}
    </GoogleMap>
))

export default Map;