import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
  getFromDealerPositionAction,
  getOrderByIdAction,
} from '../../../../store/reducer';

// Mapbox GL
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { XLg } from 'react-bootstrap-icons';

// CSS
import './style.css';

export const MapOrderDealer = (props) => {
  const dispatch = useDispatch();

  const dealerPosition = {
    lat: 6.4898312448,
    lng: -75.1498344,
  };

  // Orders and Current Order
  const orderId = props.match.params.id;
  const orderById = useSelector((state) => state.ui.orderById);

  // Component State
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [markerState, setMarkerState] = useState([]);
  const [recodigaMarkerState, setRecodigaMarkerState] = useState([]);
  const [finalMarkerState, setFinalMarkerState] = useState([]);
  const [
    currentMarkerFirstAddressId,
    setCurrentMarkerFirstAddressId,
  ] = useState(null);
  const [
    currentMarkerFinalAddressId,
    setCurrentMarkerFinalAddressId,
  ] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '50vw',
    latitude: dealerPosition.lat,
    longitude: dealerPosition.lng,
    zoom: 8,
  });

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

  useEffect(() => {
    dispatch(getOrderByIdAction(orderId));
  }, [dispatch]);

  // call dealer position
  /*
  useEffect(() => {
    dispatch(getFromDealerPositionAction());
  }, [dispatch]);
  */

  useEffect(() => {
    // Markers
    if (orderById) {
      const markers = [
        {
          id: 20,
          type: 'User',
          numero_orden: orderById.orderNumber,
          direccion: `${orderById.lastAddress} ${orderById.city} ${orderById.departament}`,
          phoneNumber: orderById.phone,
          domiciliary: orderById.domiciliary,
          coordinates: {
            lat: dealerPosition.lat,
            lng: dealerPosition.lng,
          },
        },
      ];
      const recodigaMarker = [
        {
          id: 20,
          type: 'recolección',
          numero_orden: orderById.orderNumber,
          direccion: orderById.firstAddress, // Use geocoding function here
          phoneNumber: orderById.phone,
          coordinates: {
            lat: 6.4898312448,
            lng: -75.1498344,
          },
        },
      ];
      const finalMarker = [
        {
          id: 20,
          type: 'Entrega',
          numero_orden: orderById.orderNumber,
          direccion: orderById.lastAddress, // Use geocoding function here
          phoneNumber: orderById.phone,
          coordinates: {
            lat: 6.48787842147,
            lng: -75.94987,
          },
        },
      ];
      if (markerState.length === 0) {
        setMarkerState(markers);
      }
      if (recodigaMarkerState.length === 0) {
        setRecodigaMarkerState(recodigaMarker);
      }
      if (finalMarkerState.length === 0) {
        setFinalMarkerState(finalMarker);
      }
    }
  }, [
    dispatch,
    orderById,
    markerState,
    recodigaMarkerState,
    finalMarkerState,
  ]);

  return (
    <>
      <div className="mapboxNameRandom">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
          onViewportChange={(nextViewport) =>
            setViewport(nextViewport)
          }
        >
          {markerState.map((marker) => (
            <>
              <Marker
                latitude={marker.coordinates.lat}
                longitude={marker.coordinates.lng}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <XLg
                  style={{
                    fontSize: viewport.zoom * 5,
                    cursor: 'pointer',
                  }}
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
                    <label>
                      Número Domiciliary: {marker.phoneNumber}{' '}
                    </label>
                    <label>Domiciliary: {marker.domiciliary} </label>
                  </div>
                </Popup>
              )}
            </>
          ))}

          {recodigaMarkerState.map((marker) => (
            <>
              <Marker
                latitude={marker.coordinates.lat}
                longitude={marker.coordinates.lng}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <XLg
                  style={{
                    fontSize: viewport.zoom * 5,
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    handleMarkerFristAddressClick(marker.id)
                  }
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
                      Quien Entrega?:{' '}
                      <input
                        type="text"
                        placeholder="Nombre quien recibe"
                      />
                    </label>
                    <label>Dirección: {marker.direccion} </label>
                    <label>
                      Número de quien entrega:{' '}
                      <input
                        type="text"
                        placeholder="Nombre quien recibe"
                      />{' '}
                    </label>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {finalMarkerState.map((marker) => (
            <>
              <Marker
                latitude={marker.coordinates.lat}
                longitude={marker.coordinates.lng}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <XLg
                  style={{
                    fontSize: viewport.zoom * 5,
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    handleMarkerFinalAddressClick(marker.id)
                  }
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
                      Quien Recibe?:{' '}
                      <input
                        type="text"
                        placeholder="Nombre quien recibe"
                      />
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
    </>
  );
};
