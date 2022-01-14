// React
import React, { useRef, useEffect, useState, useCallback } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  getFromDealerPositionAction,
} from "../../../../store/reducer";

// Mapbox GL
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";

// React Icons
import { FaMapMarkerAlt } from "react-icons/fa";

// CSS
import "./style.css";

export const Map = (props) => {
  // Component State
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vw",
    latitude: 6.343636,
    longitude: -75.512529,
    zoom: 8,
  });

  // Redux Dispatch
  const dispatch = useDispatch();

  // Markers
  const markers = [
    {
      id: 10,
      type: "user",
      name: dealer.name,
      address: "Cr 57A N#48-43 Copacabana Antioquia",
      phoneNumber: 323234373,
      coordinates: state.ui.position.dealer.positionDealer,
    },
  ];

  // Handles
  const handleMarkerClick = (id) => {
    setCurrentMarkerId(id);
  };

  // Get Current Location to Dealer
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getFromDealerPositionAction(dealerId));
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);
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
                <FaMapMarkerAlt
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
