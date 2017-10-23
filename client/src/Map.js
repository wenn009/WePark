import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


const Map = withScriptjs(withGoogleMap( (props) =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: props.latitude, lng: props.longitude }}
        center={{ lat: props.latitude, lng: props.longitude }}
    >
    { props.schools.map( school => {
        return <Marker position={{ lat: school.lat, lng: school.lng }} />
    })}
    </GoogleMap>
))

export default Map;