// React
import React, { useRef, useEffect, useState, useCallback } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  createPositionDealerAction,
  updatePositionDealerAction,
  getFromDealerPositionAction,
  getAllDomiciliaryAction,
  getAllOrderAction,
} from "../../../../../store/reducer";

// Mapbox GL
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";

// React Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiMapPinUserFill } from "react-icons/ri"; // To User
import { RiTreasureMapLine } from "react-icons/ri"; // Frist Address
import { RiTreasureMapFill } from "react-icons/ri"; // Final Address

// CSS
import "../style.css";

export const Map = (props) => {
  // Redux Dispatch
  const dispatch = useDispatch();

  // Position, current Dealer and Order

  const position = {
    dealer: {
      position: useSelector((state) => state.ui.position.dealer.positionDealer),
      positionId: useSelector(
        (state) => state.ui.position.dealer.positionDealerId
      ),
    },
  };

  const dealerPosition = JSON.parse(
    position.dealer.position.replace(/'/g, '"')
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
  const dealer = currentOrder[0].domiciliary.name;
  const dealerId = currentOrder[0].domiciliary.id;
  console.log("Current Order", currentOrder);

  // Component State
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [currentMarkerFirstAddressId, setCurrentMarkerFirstAddressId] =
    useState(null);
  const [currentMarkerFinalAddressId, setCurrentMarkerFinalAddressId] =
    useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vw",
    latitude: dealerPosition.lat,
    longitude: dealerPosition.lng,
    zoom: 8,
  });

  // Markers
  const markers = [
    {
      id: 20,
      type: "User",
      numero_orden: currentOrder[0].orderNumber,
      direccion: `${currentOrder[0].direccion} ${currentOrder[0].ciudad.label} ${currentOrder[0].departamento.label}`,
      phoneNumber: currentOrder[0].telefono,
      domiciliary: currentOrder[0].domiciliary.name,
      coordinates: {
        lat: dealerPosition.lat,
        lng: dealerPosition.lng,
      },
    },
  ];

  const recodigaMarker = [
    {
      id: 20,
      type: "recolección",
      numero_orden: currentOrder[0].orderNumber,
      direccion: currentOrder[0].direccionRecogida, // Use geocoding function here
      phoneNumber: currentOrder[0].telefono,
      coordinates: {
        lat: 6.4898312448,
        lng: -75.1498344,
      },
    },
  ];

  const finalMarker = [
    {
      id: 20,
      type: "Entrega",
      numero_orden: currentOrder[0].orderNumber,
      direccion: currentOrder[0].direccionEntrega, // Use geocoding function here
      phoneNumber: currentOrder[0].telefono,
      coordinates: {
        lat: 6.48787842147,
        lng: -75.94987,
      },
    },
  ];

  // Handle Dealer Marker
  const handleMarkerClick = (id) => {
    setCurrentMarkerId(id);
  };

  // Handle First Address
  const handleMarkerFristAddressClick = (id) => {
    setCurrentMarkerFirstAddressId(id);
  };

  // Handle Final Address
  const handleMarkerFinalAddressClick = (id) => {
    setCurrentMarkerFinalAddressId(id);
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
    dispatch(getAllDomiciliaryAction());
    dispatch(getFromDealerPositionAction());
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
        if (position.dealer.positionId) {
          dispatch(
            updatePositionDealerAction({
              lat: crd.latitude,
              lng: crd.longitude,
              positionId: position.dealer.positionId,
            })
          );
        } else {
          dispatch(
            createPositionDealerAction({
              position: JSON.stringify({
                lat: crd.latitude,
                lng: crd.longitude,
              }),
              user: dealerId,
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
    position.dealer.position,
    position.dealer.positionId,
    dealerId,
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
                <RiMapPinUserFill
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
                    <label>Dirección: {marker.direccion} </label>
                    <label>Número Domiciliary: {marker.phoneNumber} </label>
                    <label>Domiciliary: {marker.domiciliary} </label>
                  </div>
                </Popup>
              )}
            </>
          ))}

          {recodigaMarker.map((marker) => (
            <>
              <Marker
                latitude={marker.coordinates.lat}
                longitude={marker.coordinates.lng}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <RiTreasureMapLine
                  style={{ fontSize: viewport.zoom * 5, cursor: "pointer" }}
                  onClick={() => handleMarkerFristAddressClick(marker.id)}
                />
              </Marker>
              {marker.id === currentMarkerFirstAddressId && (
                <Popup
                  latitude={marker.coordinates.lat}
                  longitude={marker.coordinates.lng}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrentMarkerFirstAddressId(null)}
                >
                  <div className="card">
                    <label>
                      Quien Entrega?:{" "}
                      <input type="text" placeholder="Nombre quien recibe" />
                    </label>
                    <label>Dirección: {marker.direccion} </label>
                    <label>
                      Número de quien entrega:{" "}
                      <input type="text" placeholder="Nombre quien recibe" />{" "}
                    </label>
                  </div>
                </Popup>
              )}
            </>
          ))}

          {finalMarker.map((marker) => (
            <>
              <Marker
                latitude={marker.coordinates.lat}
                longitude={marker.coordinates.lng}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <RiTreasureMapFill
                  style={{ fontSize: viewport.zoom * 5, cursor: "pointer" }}
                  onClick={() => handleMarkerFinalAddressClick(marker.id)}
                />
              </Marker>
              {marker.id === currentMarkerFinalAddressId && (
                <Popup
                  latitude={marker.coordinates.lat}
                  longitude={marker.coordinates.lng}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrentMarkerFinalAddressId(null)}
                >
                  <div className="card">
                    <label>
                      Quien Recibe?:{" "}
                      <input type="text" placeholder="Nombre quien recibe" />
                    </label>
                    <label>Dirección: {marker.direccion} </label>
                    <label>Número de quien Recibe: {}</label>
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
