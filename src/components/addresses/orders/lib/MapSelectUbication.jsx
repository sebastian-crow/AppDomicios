import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

// Mapbox GL
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";

// Redux
import { useDispatch, useSelector } from "react-redux";

import { MapGeocode } from "./MapGeocode";

// Actions
import {
  createPositionClientAction,
  updatePositionClientAction,
  getFromClientPositionAction,
} from "../../../../store/reducer";

// React Icons
import { FaMapMarkerAlt } from "react-icons/fa";

export const MapOrderUbication = () => {
  const positionClient = {
    position: useSelector((state) => state.ui.position.client.positionClient),
    positionId: useSelector(
      (state) => state.ui.position.client.positionClientId
    ),
  };

  const clientPosition = JSON.parse(positionClient.position.replace(/'/g, '"'));

  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(clientPosition.lng);
  const [lat, setLat] = useState(clientPosition.lat);
  const [zoom, setZoom] = useState(9);

  const clientId = useSelector((state) => state.login.usuario.user._id);

  // Markers
  const marker = {
    id: 20,
    type: "currentUser",
    name: useSelector((state) => state.login.usuario.user.nombre),
    address: "direction xd",
    phoneNumber: 3413443482,
    coordinates: {
      lat: clientPosition.lat,
      lng: clientPosition.lng,
    },
  };

  // Get Current Location to Client
  useEffect(() => {
    if (positionClient.position) {
      const timer = setInterval(() => {
        dispatch(getFromClientPositionAction(clientId));
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        function success(pos) {
          var crd = pos.coords;
          if (positionClient.positionId) {
            dispatch(
              updatePositionClientAction({
                lat: crd.latitude,
                lng: crd.longitude,
                positionId: positionClient.positionId,
              })
            );
          } else {
            dispatch(
              createPositionClientAction({
                position: JSON.stringify({
                  lat: crd.latitude,
                  lng: crd.longitude,
                }),
                usuario: clientId,
              })
            );
          }
        }

        function error(err) {
          console.warn("ERROR(" + err.code + "): " + err.message);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, positionClient.position, positionClient.positionId, clientId]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <>
      <H1>hello</H1>
    </>
  );
};

/* 
<div>
        <div ref={mapContainer} className="map-container" />
      </div>
      <style jsx>{`
        .map-container {
          border-radius: 8px;
          height: 600px;
          border: 1px solid black;
        }
      `}</style>


*/
