// React
import React, { useRef, useEffect, useState, useCallback } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  updatePositionAction,
  getFromUserPositionAction,
  createPositionAction,
  getAllDomiciliarioAction,
  getAllOrderAction,
} from "../../../../../store/reducer";

// Mapbox GL
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

// Material UI
import { Room } from "@material-ui/icons";

// CSS
import "../style.css";

export const Map = (props) => {
  // Redux Dispatch
  const dispatch = useDispatch();

  // Position, current User and Domiciliarios
  const position = useSelector((state) => state.ui.position);
  const positionId = useSelector((state) => state.ui.positionId);
  const user = useSelector((state) => state.login.usuario.user);
  const userID = useSelector((state) => state.login.usuario.user._id);
  const userPosition = JSON.parse(position.replace(/'/g, '"'));

  // Component State
  const [geoCoordinates, setGeoCoordinates] = useState([]);
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vw",
    latitude: userPosition.lat,
    longitude: userPosition.lng,
    zoom: 8,
  });

  // Orders and Current Order
  const orderId = props.match.params.id;
  const orders = useSelector((state) => state.ui.orders);
  const currentOrder = [];
  orders.map((order) => {
    if (order._id === orderId) {
      currentOrder.push(order);
    }
  });

  // Markers
  const markers = [
    {
      id: 20,
      type: "order",
      name: currentOrder[0].orderName,
      address: currentOrder[0].direccion,
      phoneNumber: 3413443482,
      coordinates: {
        lat: 6.24013,
        lng: -75.56574,
      },
    },
    {
      id: 10,
      type: "user",
      name: user.nombre,
      address: "Cr 57A N#48-43 Copacabana Antioquia",
      phoneNumber: 323234373,
      coordinates: {
        lat: userPosition.lat,
        lng: userPosition.lng,
      },
    },
  ];

  // Handles
  const handleMarkerClick = (id) => {
    setCurrentMarkerId(id);
  };

  // Road Between both points
  const Road = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-75.56574, 6.24013],
        [-75.512529, 6.343636],
      ],
    },
  };

  // UseEffect's
  useEffect(() => {
    dispatch(getAllOrderAction());
    dispatch(getAllDomiciliarioAction());
  }, []);

  // Get Current Location to user
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getFromUserPositionAction(userID));
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function success(pos) {
        var crd = pos.coords;
        if (positionId) {
          dispatch(
            updatePositionAction({
              lat: crd.latitude,
              lng: crd.longitude,
              positionId: positionId,
            })
          );
        } else {
          dispatch(
            createPositionAction({
              position: JSON.stringify({
                lat: crd.latitude,
                lng: crd.longitude,
              }),
              usuario: userID,
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
  }, [dispatch, position, positionId, userID]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!geoCoordinates) {
        setGeoCoordinates({
          lat: 7848,
          lng: -48137418,
        });
        console.log("geocoordinates", geoCoordinates);
      }
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="mapboxNameRandom">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          //mapStyle=""
        >
          {markers.map((marker) => (
            <>
              <Marker
                latitude={marker.coordinates.lat}
                longitude={marker.coordinates.lng}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <Room
                  style={{ fontSize: viewport.zoom * 5, cursor: "pointer" }}
                  onClick={() => handleMarkerClick(marker.id)}
                />
              </Marker>
              {marker.id === currentMarkerId && (
                <Popup
                  latitude={marker.coordinates.lat}
                  longitude={marker.coordinates.lng}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrentMarkerId(null)}
                >
                  <div className="card">
                    {marker.type === "user" && (
                      <label>Name: {marker.name}</label>
                    )}
                    {marker.type === "order" && (
                      <label>Order Name: {marker.name}</label>
                    )}
                    <label>Address: {marker.address} </label>
                    <label>Phone Number: {marker.phoneNumber} </label>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {/* 
            <Source id="polylineLayer" type="geojson" data={Road}>
            <Layer
              id="lineLayer"
              type="line"
              source="my-data"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "rgba(3, 170, 238, 0.5)",
                "line-width": 5,
              }}
            />
          </Source>  
        
          */}
        </ReactMapGL>
      </div>
      <style jsx>{`
        .mapboxNameRandom {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
        }
      `}</style>
    </>
  );
};
