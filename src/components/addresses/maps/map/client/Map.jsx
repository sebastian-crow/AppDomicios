// React
import React, { useRef, useEffect, useState, useCallback } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  createPositionClientAction,
  updatePositionClientDoneAction,
  getFromClientPositionDoneAction,
  createPositionDealerAction,
  updatePositionDealerAction,
  getFromDealerPositionAction,
  getAllDomiciliarioAction,
  getAllOrderAction,
} from "../../../../../store/reducer";

// Mapbox GL
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";

// React Icons
import { FaMapMarkerAlt } from "react-icons/fa";

// CSS
import "../style.css";

export const Map = (props) => {
  // Redux Dispatch
  const dispatch = useDispatch();

  // Position, current Dealer and Order

  const positions = {
    client: {
      position: useSelector((state) => state.ui.position.client.positionClient),
      positionId: useSelector(
        (state) => state.ui.position.client.positionClientId
      ),
    },
    dealer: {
      position: useSelector((state) => state.ui.position.dealer.positionDealer),
      positionId: useSelector(
        (state) => state.ui.position.dealer.positionDealerId
      ),
    },
  };

  const dealerPosition = JSON.parse(
    positions.dealer.position.replace(/'/g, '"')
  );
  const clientPosition = JSON.parse(
    positions.client.position.replace(/'/g, '"')
  );

  // Orders and Current Order
  const orderId = props.match.params.id;
  const orders = useSelector((state) => state.ui.orders);
  const currentOrder = [];
  orders.map((order) => {
    if (order._id === orderId) {
      currentOrder.push(order);
    }
  });

  // Dealer
  const dealer = currentOrder[0].domiciliario.name;
  const dealerId = currentOrder[0].domiciliario.id;

  // Client
  const client = useSelector((state) => state.login.usuario.user);
  const clientId = useSelector((state) => state.login.usuario.user._id);

  // Component State
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vw",
    latitude: clientPosition.lat,
    longitude: clientPosition.lng,
    zoom: 8,
  });

  // Markers
  const markers = [
    {
      id: 20,
      type: "order",
      numero_orden: currentOrder[0].orderNumber,
      direccion: `${currentOrder[0].direccion} ${currentOrder[0].ciudad.label} ${currentOrder[0].departamento.label}`,
      phoneNumber: currentOrder[0].telefono,
      domiciliario: currentOrder[0].domiciliario.name,
      coordinates: {
        lat: dealerPosition.lat,
        lng: dealerPosition.lng,
      },
    },
    {
      id: 10,
      type: "user",
      name: "dealer.nombre",
      address: "Cr 57A N#48-43 Copacabana Antioquia",
      phoneNumber: 323234373,
      coordinates: {
        lat: 6.343636,
        lng: -75.512529,
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

  // Get Current Location to Dealer
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getFromDealerPositionAction(dealerId));
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function success(pos) {
        var crd = pos.coords;
        if (positions.dealer.positionId) {
          dispatch(
            updatePositionDealerAction({
              lat: crd.latitude,
              lng: crd.longitude,
              positionId: positions.dealer.positionId,
            })
          );
        } else {
          dispatch(
            createPositionDealerAction({
              position: JSON.stringify({
                lat: crd.latitude,
                lng: crd.longitude,
              }),
              usuario: dealerId,
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
  }, [
    dispatch,
    positions.dealer.position,
    positions.dealer.positionId,
    dealerId,
  ]);

  // Get Current Location to Client
  useEffect(() => {
    if (!positions.client.position) {
      const timer = setInterval(() => {
        dispatch(getFromClientPositionDoneAction(clientId));
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        function success(pos) {
          var crd = pos.coords;
          if (positions.client.positionId) {
            dispatch(
              updatePositionClientDoneAction({
                lat: crd.latitude,
                lng: crd.longitude,
                positionId: positions.client.positionId,
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
  }, [
    dispatch,
    positions.client.position,
    positions.client.positionId,
    clientId,
  ]);

  return (
    <>
      <div className="mapboxNameRandom">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
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
                      <label>Número de Orden: {marker.numero_orden}</label>
                    )}
                    <label>Dirección: {marker.direccion} </label>
                    <label>Número de Contacto: {marker.phoneNumber} </label>
                    <label>Domiciliario: {marker.domiciliario} </label>
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
