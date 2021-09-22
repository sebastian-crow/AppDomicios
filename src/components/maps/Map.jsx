import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { useSelector } from "react-redux";

const MyMapComponent = compose(
  withProps({
    googleMapURL: process.env.API_GOOGLE_MAPS,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
    <GoogleMap zoom={props.zoom}  defaultZoom={13} defaultCenter={props.markers.length > 0 ? props.markers[0] : { lat: 6.208376299999999, lng: -75.5658174 }}  center={props.markers.length > 0 ? props.markers[0] : { lat: 6.208376299999999, lng: -75.5658174 }}>
      {props.markers.map(marker =>
        <Marker position={marker} />
      )}
    </GoogleMap>
);

const BusquedaMapa = () => {
  const markers = useSelector((state) => state.ui.ubicacionesRestaurantes);
  return (
    <MyMapComponent markers={markers} zoom={markers.length > 0 ? 13: 8}  />
  )
}

export default BusquedaMapa;

