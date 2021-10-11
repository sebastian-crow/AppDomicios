import React, { useEffect, useRef, useState } from 'react'
import UseScript from "../../hooks/UseScript"


const MapProof = () => {
    const Map = useRef()
    const seo = UseScript(process.env.REACT_APP_API_GOOGLE_MAPS)
    console.log('SEO', seo)

    const google = window.google.maps
    console.log('What contains google?', google)

    const [geolocationData, setGeolocationData] = useState([])


    useEffect(() => {

        const timer = setTimeout(() => {
            UseScript(process.env.REACT_APP_API_GOOGLE_MAPS)
            //console.log('What is it', UseScript(process.env.REACT_APP_API_GOOGLE_MAPS))
            fetch('https://www.datos.gov.co/resource/g373-n3yy.json')
                .then(response => response.json())
                .then(locations => {
                    let locationsInfo = []

                    locations.forEach(location => {
                        let locationData = {
                            position: { lat: location.punto.coordinates[1], lng: location.punto.coordinates[0] },
                            name: location.nombre_sede
                        }
                        
                    })
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((data) => {
                            let currentPosition = {
                                lat: data.coords.latitude,
                                lng: data.coords.longitude
                            }
                            setGeolocationData(geolocationData.push(currentPosition)) // Set state
                            console.log('GEOLOCATION DATA', geolocationData)
                            dibujarMapa(currentPosition, locationsInfo)
                        })
                    }
                })
        }, 10000)
        //const GetLocations = 

        const dibujarMapa = setTimeout((obj, locationsInfo) => {
            console.log(google)
            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: obj
            })

            let marker = new google.maps.Marker({
                position: obj,
                title: 'Tu ubicacion'
            })
            marker.setMap(map)

            let markers = locationsInfo.map(place => {
                return new google.maps.Marker({
                    position: place.position,
                    map: map,
                    title: place.name
                })
            })
        }, 10000)
        //const dibujarMapa = 
    })


    return (
        <div id="map" ref={Map}></div>
    )
}

export default MapProof


// Metodo de ciclo de vida para cuando montemos o desmontemos componente
// Lifecycle mehtods for when mounting or unmounting our components
// Use ref for manipulate the dom with react 




































