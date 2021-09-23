import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


const MyMapComponent = compose(
  withProps({
    googleMapURL: process.env.REACT_APP_API_GOOGLE_MAPS,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  <GoogleMap
    zoom={props.zoom}
    defaultZoom={13}
    defaultCenter={{ lat: 6.208376299999999, lng: -75.5658174 }}
    center={{ lat: 6.208376299999999, lng: -75.5658174 }}>
    <Marker position={props.position} />
  </GoogleMap>
);

const MapLocal = (props) => {
  return (
    <MyMapComponent zoom={8} position={props.position} />
  )
}

export default MapLocal;

