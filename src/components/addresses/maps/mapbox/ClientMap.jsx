// React
import React, { useRef, useEffect, useState } from 'react';
import './css/markersStyle.css'
import './css/index.css'
import ReactMapGL, { Layer } from 'react-map-gl';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
    updatePositionAction,
    getFromUserPositionAction,
    createPositionAction,
    //getAllDomiciliarioAction 
    getAllOrderAction
} from "../../../../store/reducer";


//console.log('MAPBOXGL', mapboxgl)
mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYXN0aWFuY3JvdyIsImEiOiJja3VnOW5yazUwanYwMm9waHY1NWdoaHRnIn0.kIsU3HWfUybUwU2DvavkwA';




const stores = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -75.512527,
                    6.343636
                ]
            },
            "properties": {
                "phoneFormatted": "3195158887",
                "phone": "2022347336",
                "address": "Carrera 57A N# 48-43",
                "city": "Copacabana",
                "country": "Colombia",
                "crossStreet": "at 15th St NW",
                "postalCode": "050022",
                //"state": "D.C."
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -75.561148,
                    6.259861
                ]
            },
            "properties": {
                "phoneFormatted": "21171157",
                "phone": "21171157",
                "address": "Calle 64 #154, Medellín, Antioquia",
                "city": "Medellin",
                "country": "Colombia",
                "crossStreet": "at 15th St NW",
                "postalCode": "050022",
                //"state": "D.C."
            }
        },
    ]
}

/* Assign a unique ID to each store */
stores.features.forEach(function (store, i) {
    store.properties.id = i;
});


export const ClientMap = (props) => {

    const dispatch = useDispatch();
    const userID = useSelector((state) => state.login.usuario.user._id);
    const position = useSelector((state) => state.ui.position);
    const positionId = useSelector((state) => state.ui.positionId);
    const user = useSelector((state) => state.login.usuario.user)


    const orderId = props.match.params.id;
    //console.log('ORDER ID RECEIVED', orderId)

    const orders = useSelector((state) => state.ui.orders)


    /*
    const orderFind = () => {

        let order
        const orderSelect = orders.map((order) => {
            if (order._id === orderId) return order
        })

        for (let i = 0; i < orderSelect; i++) {
            if(orderSelect[i]._id === orderId) {
                
            }
        }


        
    }
    //console.log('ORDER FOUND', order)

    console.log(orders)
    console.log('ORDER FIND', order)
*/

    useEffect(() => {
        dispatch(getAllOrderAction())
    }, [dispatch, orders])

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(getFromUserPositionAction(userID)); //  this line
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                var crd = pos.coords;
                if (positionId) {
                    dispatch(updatePositionAction({ lat: crd.latitude, lng: crd.longitude, positionId: positionId }));
                } else {
                    dispatch(createPositionAction({ position: JSON.stringify({ lat: crd.latitude, lng: crd.longitude }), usuario: userID }));
                }
            };

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        }, 5000);

        return () => clearTimeout(timer);
    }, [dispatch, position, positionId, userID]);



    //console.log('POSITION', position)
    const userPosition = JSON.parse(position.replace(/'/g, '"'))


    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(userPosition.lng);
    const [lat, setLat] = useState(userPosition.lat);
    const [zoom, setZoom] = useState(13);




    const buildLocationList = ({ features }) => {
        for (const { properties } of features) {
            /* Add a new listing section to the sidebar. */
            const listings = document.getElementById('listings');
            const listing = listings.appendChild(document.createElement('div'));
            /* Assign a unique `id` to the listing. */
            listing.id = `listing-${properties.id}`;
            /* Assign the `item` class to each listing for styling. */
            listing.className = 'item';

            /* Add the link to the individual listing created above. */
            const link = listing.appendChild(document.createElement('a'));
            link.href = '#';
            link.className = 'title';
            link.id = `link-${properties.id}`;
            link.innerHTML = `${properties.address}`;

            /* Add details to the individual listing. */
            const details = listing.appendChild(document.createElement('div'));
            details.innerHTML = `${properties.city}`;
            if (properties.phone) {
                details.innerHTML += ` · ${properties.phoneFormatted}`;
            }
            if (properties.distance) {
                const roundedDistance = Math.round(properties.distance * 100) / 100;
                details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
            }

            // Event Listener
            link.addEventListener('click', function () {
                for (const feature of features) {
                    if (this.id === `link-${feature.properties.id}`) {
                        flyToStore(feature);
                        createPopUp(feature);
                    }
                }
                const activeItem = document.getElementsByClassName('active');
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                this.parentNode.classList.add('active');
            });
        }
    }

    const flyToStore = (currentFeature) => {
        map.current.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    }

    const createPopUp = (currentFeature) => {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();

        const popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML(`<h3>Addresss</h3><h4>${currentFeature.properties.address}</h4>`)
            .addTo(map.current);
    }



    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            //center: [-77.034084, 38.909671],
            zoom: zoom
        });
        map.current.on('load', () => {
            /* Add the data to your map as a layer 
            
            map.current.addLayer({
              id: 'locations',
              type: 'circle',
              // Add a GeoJSON source containing place coordinates and information.
              source: {
                type: 'geojson',
                data: stores
              }
            });
            */
            // This function is for to load custom markers
            map.current.addSource('places', {
                type: 'geojson',
                data: stores
            });
            buildLocationList(stores);
            addMarkers()
        });

        const addMarkers = () => {
            /* For each feature in the GeoJSON object above: */
            for (const marker of stores.features) {
                /* Create a div element for the marker. */
                const el = document.createElement('div');
                /* Assign a unique `id` to the marker. */
                el.id = `marker-${marker.properties.id}`;
                /* Assign the `marker` class to each marker for styling. */
                el.className = 'marker';

                /**
                 * Create a marker using the div element
                 * defined above and add it to the map.
                 **/
                new mapboxgl.Marker(el, { offset: [0, -23] })
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map.current);

                el.addEventListener('click', (e) => {
                    /* Fly to the point */
                    flyToStore(marker);
                    /* Close all other popups and display popup for clicked store */
                    createPopUp(marker);
                    /* Highlight listing in sidebar */
                    const activeItem = document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(`listing-${marker.properties.id}`);
                    listing.classList.add('active');
                });
            }
        }
        /*
        map.current.on('click', ({ point }) => {
          // Determine if a feature in the "locations" layer exists at that point. 
          const features = map.current.queryRenderedFeatures(point, {
            layers: ['locations']
          });
      
          // If it does not exist, return 
          if (!features.length) return;
      
          const clickedPoint = features[0];
      
          //Fly to the point 
          flyToStore(clickedPoint);
      
          // Close all other popups and display popup for clicked store 
          createPopUp(clickedPoint);
      
          // Highlight listing in sidebar (and remove highlight for all other listings) 
          const activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          const listing = document.getElementById(
            `listing-${clickedPoint.properties.id}`
          );
          listing.classList.add('active');
        });
        */
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));

            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <>
            <div className="mainContainer">
                <div class='sidebar'>
                    <div class='heading'>
                        <h1>Dealer Orders</h1>
                    </div>
                    <div id='listings' className='listings'></div>
                </div>
                <div ref={mapContainer} className="map" />

            </div>

            <style jsx>{`
        .mainContainer {
            position: absolute;
            top: 7rem;
            left: 3rem;
            width: 95%;
            height: 80%;
            
            
        }

        .map-z {
            
            border: 1px solid black;
        }
        `}</style>
        </>
    );
}
//Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}


