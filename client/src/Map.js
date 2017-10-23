import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Demo from './demo';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";


const Map = withScriptjs(withGoogleMap( (props) =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 40.6314447, lng: -73.9566375 }}
    >
    { props.schools.map( school => {
        return <Marker position={{ lat: school.lat, lng: school.lng }} />
    })}
    
    </GoogleMap>
))

export default Map;