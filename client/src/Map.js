import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Demo from './demo';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";


const Map = withScriptjs(withGoogleMap( (props) =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 40.6314447, lng: -73.9566375 }}
    >
    <Marker position={{ lat: 40.6314447, lng: -73.9566375 }} />
    <Marker position={{ lat:40.731939, lng: -73.7138067 }} />
    <Marker position={{ lat: 40.7540616, lng: -73.9955389 }} />
    
    </GoogleMap>
))

export default Map;