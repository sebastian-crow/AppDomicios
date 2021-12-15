import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

// Actions
import {
  createPositionClientAction,
  updatePositionClientAction,
  getFromClientPositionAction,
} from "../../../../store/reducer";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API;

export const MapGeocode = () => {
  const positionClient = {
    position: useSelector((state) => state.ui.position.client.positionClient),
    positionId: useSelector(
      (state) => state.ui.position.client.positionClientId
    ),
  };

  const clientPosition = JSON.parse(positionClient.position.replace(/'/g, '"'));
  const dispatch = useDispatch();

  const [viewport, setViewport] = useState({
    latitude: clientPosition.lat,
    longitude: clientPosition.lng,
    zoom: 8,
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const clientId = useSelector((state) => state.login.usuario.user._id);

  // Marker
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

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

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

  return (
    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="60%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
    </div>
  );
};
