import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { getAllOrderAction } from "../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";


// Proof Markers
const markers = [
  {
    id: 1,
    name: "Copacabana",
    position: { lat: 6.343636, lng: -75.512527 }
  },
  {
    id: 2,
    name: "Medellin", 
    position: { lat: 6.247638, lng: -75.56815 }
  },
  {
    id: 3,
    name: "Bello",
    position: { lat: 6.339396, lng: -75.5451 }
  },
  {
    id: 4,
    name: "Marinilla",
    position: { lat: 6.1684, lng: -75.332129 }
  }
];







function Map() {
    const dispatch = useDispatch();
  const orders = useSelector((state) => state.ui.orders)
  const user = useSelector((state) => state.login.usuario.user)
  const ordersCopy = [...orders]

  const ownDealerOrders = []
  ordersCopy.map((order) => {
	if(order.domiciliario.id === user._id ) {
		ownDealerOrders.push(order)
	}	
  })

  const dealerMarkers = [] // Once we done with the geocoding problem, we gonna to use this markers
  ownDealerOrders.map((order) => {
	return dealerMarkers.push({
		id: order._id,
		name: `${order.orderName} by ${order.cliente.name}`,
		//position: order.direccion.coords
		position: { lat: 6.1684, lng: -75.332129 } 

	})
  })

  console.log('Dealer Markers',dealerMarkers)
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds()
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  useEffect(() => {
	dispatch(getAllOrderAction())
  }, [dispatch])

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
    >
      {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
