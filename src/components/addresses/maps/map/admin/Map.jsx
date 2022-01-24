// React
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
  createPositionDealerAction,
  updatePositionDealerAction,
  getFromDealerPositionAction,
  getAllDomiciliaryAction,
  getAllOrderProductByUserAction,
} from '../../../../../store/reducer';

// Mapbox GL
import ReactMapGL, {
  Marker,
  Popup,
  Source,
  Layer,
} from 'react-map-gl';

// CSS
import '../style.css';

// React Boostrap Icons
import { CheckLg, XLg } from 'react-bootstrap-icons';

export const Map = (props) => {
  // Component State
  const [currentMarkerId, setCurrentMarkerId] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '50vw',
    latitude: 6.343636,
    longitude: -75.512529,
    zoom: 8,
  });

  // Redux Dispatch
  const dispatch = useDispatch();

  // Position, current Dealer and Order
  const positions = {
    client: {
      position: useSelector(
        (state) => state.ui.position.client.positionClient
      ),
      positionId: useSelector(
        (state) => state.ui.position.client.positionClientId
      ),
    },
    dealer: {
      position: useSelector(
        (state) => state.ui.position.dealer.positionDealer
      ),
      positionId: useSelector(
        (state) => state.ui.position.dealer.positionDealerId
      ),
    },
  };

  // Dealer
  const dealer = useSelector((state) => state.login.user);
  const dealerId = useSelector((state) => state.login.user.id);

  // const dealerPosition = JSON.parse(
  //   positions.dealer.position.replace(/'/g, '"')
  // );
  // const clientPosition = JSON.parse(
  //   positions.client.position.replace(/'/g, '"')
  // );

  // Orders and Current Order
  const orderId = props.match.params.id;
  console.log('order number', orderId);
  const currentOrder = useSelector((state) =>
    state.ui.orders.filter((order) => order.id == orderId)
  );
  console.log('Current order', currentOrder);
  // const clientId = currentOrder[0].clientId;

  // Markers
  const markers = [
    {
      id: 20,
      type: 'order',
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
      type: 'user',
      name: dealer.name,
      address: 'Cr 57A N#48-43 Copacabana Antioquia',
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
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [
        [-75.56574, 6.24013],
        [-75.512529, 6.343636],
      ],
    },
  };

  // UseEffect's
  useEffect(() => {
    if (!currentOrder.length) dispatch(getAllOrderProductByUserAction());
    //dispatch(getAllDomiciliaryAction());
  }, [dispatch, currentOrder]);

  // // Get Current Location to Dealer
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     dispatch(getFromDealerPositionAction(dealerId));
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [
  //   dispatch,
  //   positions.dealer.position,
  //   positions.dealer.positionId,
  //   dealerId,
  // ]);

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
          {markers.map((marker) => (
            <>
              <Marker
                latitude={marker.coordinates.lat}
                longitude={marker.coordinates.lng}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <CheckLg
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
                    {marker.type === 'user' && (
                      <label>Name: {marker.name}</label>
                    )}
                    {marker.type === 'order' && (
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
    </>
  );
};
