import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 40.6314447, lng: -73.9566375 }}
    >
    {props.isMarkerShown && <Marker position={{ lat: 40.6314447, lng: -73.9566375 }} />}
    </GoogleMap>
))

export default Map;