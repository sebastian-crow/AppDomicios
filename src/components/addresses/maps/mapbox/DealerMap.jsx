// React
import React, { useEffect, useRef, useState, useCallback } from 'react'

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Mapbox
import mapboxgl from '!mapbox-gl'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'



// Component DealerMap
export const DealerMap = () => {

    const dispatch = useDispatch()
    const map = useRef(null)
    const mapContainerRef = useRef(null)
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const orders = useSelector((state) => state.ui.orders)

    const user = useSelector((state) => state.login.usuario.usre)

    const currentOrders = []
    orders.map((order) => {
        if (order.domiciliario.id === user._id) {
            currentOrders.push(order)
        }
    })

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log('geolocation not supported')
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            })
        }
    })

    useEffect(() => {
        if (map.current) return

        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 9,
            center: [lng, lat]
        })

        // Clean up on unmount
        return () => map.current.remove()
    }, [])

    const fetchData = useCallback(() => {
        const geocodingClient = mbxGeocoding({
            accessToken: process.env.REACT_APP_MAPBOX_API,
        })

        // Geocoding with countries

        return currentOrders.map((order) => {
            geocodingClient
                .forwardGeocode({
                    query: order.direccion.address,
                    countries: ['co'],
                    language: ['es'],
                    limit: 2,
                })
                .send()
                .then((response) => {
                    const match = response.body
                    const coordinates = match.features[0].geometry.coordinates
                    console.log('coordinates', coordinates)
                    const placeName = match.features[0].place_name
                    const center = match.features[0].center

                    return {
                        type: 'Feature',
                        center: center,
                        geometry: {
                            type: 'Point',
                            coordinates: coordinates,
                        },
                        properties: {
                            description: placeName
                        }
                    }
                })
        }, [])
    })


    useEffect(() => {
        if (!map.current) return // Waits for the map to initialise

        const results = fetchData()

        results.then((marker) => {
            // Create a HTML document for each feature
            let el = document.createElement('div')
            el.className = 'marker'

            // Make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 5 }) // add popups
                        .setHTML('<p>' + marker.properties.description + '</p>')
                )
                .addTo(map.current)

            map.current.on('load', async () => {
                map.current.flyTo({
                    center: marker.center,
                })
            })
        })
    }, fetchData)



    return (
        <>
            <div>
                <div ref={mapContainerRef} className="map-container" />
            </div>
            <style jsx>{`
      .map-container {
        width: 100%;
        height: 500px;
        border-radius: 5px;
        position: absolute;
        left: 0;
        top: 40%;
        border: 2px solid black;
      }

      .marker {
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background-color: blue;
        cursor: pointer;
      }

      .marker:before,
      .marker:after {
        content: ' ';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 1px solid blue;
        border-radius: 50%
      }

      .marker:before {
        animation: ripple 2s Linear infinite;
      }

      .marker:after {
        animation: ripple 2s linear 1s infinite;
      }

      @keyframes ripple{
        0% {
          transform: scale(1);
        }
        50% {
          transform: scal(1.3)
          opacity: 1;
        }
        100% {
          transform: scale(1.6);
          opacity: 0
        }
      }
    `}</style>
        </>
    )
}



/*
return geocodingClient
            .forwardGeocode({
                query: 'Cr. 57A N# 48-43 Copacabana Antoquia',
                countries: ['co'],
                language: ['es'],
                limit: 2,
            })
            .send()
            .then((response) => {
                const match = response.body
                const coordinates = match.features[0].geometry.coordinates
                console.log('coordinates', coordinates)
                const placeName = match.features[0].place_name
                const center = match.features[0].center

                return {
                    type: 'Feature',
                    center: center,
                    geometry: {
                        type: 'Point',
                        coordinates: coordinates,
                    },
                    properties: {
                        description: placeName
                    }
                }
            })
    }, [])

*/