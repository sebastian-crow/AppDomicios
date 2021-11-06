// React
import React, { useRef, useEffect, useState, useCallback } from 'react';

// Custom CSS
import '../css/markersStyle.css'
import '../css/index.css'

// Mapbox
import mapboxgl from '!mapbox-gl';
import ReactMapGL, { Layer } from 'react-map-gl';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
    updatePositionAction,
    getFromUserPositionAction,
    createPositionAction,
    getAllDomiciliarioAction,
    getAllOrderAction
} from "../../../../../store/reducer";


// DealerMap Component
export const DealerMapProof = (props) => {

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API

    const dispatch = useDispatch();
    const userID = useSelector((state) => state.login.usuario.user._id);
    const position = useSelector((state) => state.ui.position);
    const positionId = useSelector((state) => state.ui.positionId);
    const user = useSelector((state) => state.login.usuario.user);


    const orderId = props.match.params.id;

    const orders = useSelector((state) => state.ui.orders)

    const currentOrder = []
    orders.map((order) => {
        if (order._id === orderId) {
            currentOrder.push(order)
        }
    })
    const city = currentOrder[0].direccion.address.split(" ")[5]

    useEffect(() => {
        dispatch(getAllOrderAction())
    }, [])

    const fetchData = useCallback(() => {
        const geocodingClient = mbxGeocoding({
            accessToken: process.env.REACT_APP_MAPBOX_API
        })

        // Geocoding with countries
        return geocodingClient
            .forwardGeocode({
                query: "Cr57A N#48-43 Copacabana Antioquia",
                countries: ["co"],
                language: ["es"],
                limit: 2,
            })
            .send()
            .then((response) => {
                const match = response.body
                const coordinates = match.features[0].geometry.coordinates;
                console.log('COORDINATES FETCH DATA', coordinates);
                const placeName = match.features[0].place_name;
                const center = match.features[0].center;

                return {
                    type: "Feature",
                    center: center,
                    geometry: {
                        type: "Point",
                        coordinates: coordinates,
                    },
                    properties: {
                        description: placeName,
                    }
                }
            })
    }, [])

    const fetchGeocodingData = () => {

        const geocodingClient = mbxGeocoding({
            accessToken: process.env.REACT_APP_MAPBOX_API
        })

        // Geocoding with countries
        return geocodingClient
            .forwardGeocode({
                query: currentOrder[0].direccion.address,
                countries: ["co"],
                language: ["es"],
                limit: 2,
            })
            .send()
            .then((response) => {
                const match = response.body
                const coordinates = match.features[0].geometry.coordinates;
                const placeName = match.features[0].place_name;
                const center = match.features[0].center

                return {
                    type: "Feature",
                    center: center,
                    geometry: {
                        type: "Point",
                        coordinates: coordinates,
                    },
                    properties: {
                        description: placeName,
                    },
                }
            })

    }

    const [geoCoordinates, setGeoCoordinates] = useState([])

    const resultsGeocoding = fetchGeocodingData()
    if(!geoCoordinates) {
        resultsGeocoding.then((geoInfo) => {
            setGeoCoordinates(geoInfo)
        })
    
    }
    
    console.log('RESULTS GEOCODING FETCH', geoCoordinates)

    const storesDomiciliario = orders.map((order) => {

        // Validate orders current user5
        if (order.domiciliario.id === user._id) {
            const orderSplit = order.direccion.address.split(" ")
            const esteStore = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -75.512527,
                        6.343636
                    ],
                },
                "properties": {
                    "id": Math.floor(Math.random() * 100),
                    "phoneFormatted": "13245746545",
                    "address": order.direccion.address,
                    "city": orderSplit[5],
                    "crossStreet": "at 15th St NW",
                    "postalCode": "05002",
                    //"state": "D.C"
                },
            }
            return esteStore
        }
    })

    const currentStore = [
	    {
	        "type": "Feature",
        	"geometry": {
	            "type": "Point",
	            "coordinates": geoCoordinates.geometry?.coordinates,
	        },
	        "properties": {
	            "id": Math.floor(Math.random() * 100),
	            "phoneFormatted": "235343546",
	            "address": currentOrder[0].direccion.address,
	            "city": city,
	            //"crossStreet": "at 15th St NW",
	            "postalCode": "050025",
        	    //"state": "D.C"
	        }
	    }
	]

    const stores = {
        "type": "FeaturesCollection",
        "features": currentStore
    }

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(getFromUserPositionAction(userID));
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


    // Component State
    const userPosition = JSON.parse(position.replace(/'/g, '"'))

    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(userPosition.lng)
    const [lat, setLat] = useState(userPosition.lat)
    const [zoom, setZoom] = useState(13)

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
            zoom: zoom
        });
        map.current.on('load', () => {

            // This function is for to load custom markers
            map.current.addSource('places', {
                type: 'geojson',
                data: stores
            });

            map.current.addLayer({
                "id": "route",
                "type": "line",

                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [
                                [lng, lat],
                                geoCoordinates.geometry?.coordinates
                            ]
                        }
                    }
                }
            })
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
                console.log(marker.geometry.coordinates)
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
            <div>
                <div class='sidebar'>
                    <div class='heading'>
                        <h1>Dealer Orders</h1>
                    </div>
                    <div id='listings' className='listings'></div>
                </div>
                <div ref={mapContainer} className="map" />
            </div>
            <style jsx>{`
			#route {
				stroke-dasharray: 1000;
				stroke-dashoffset: 1000;
				animation: dash 1s linear alternate infinite;
			}

			@keyframes dash {
				from {
					stroke-dashoffset: 1000;
				}
				to {
					stroke-dashoffset: 0;
			}
		    `}</style>
        </>

    );
}

