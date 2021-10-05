
/*import React, { useEffect, useState, useReducer, useRef } from "react";
import { PropTypes } from "prop-types";
import ReactDOM from 'react'
import { makeCancelable } from "../../lib/cancelablePromise";
import { getFromUserPositionAction, getAllOrderAction } from '../../store/reducer'
import { useDispatch, useSelector } from 'react-redux'


const mapStyles = {
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    map: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    }
};

const evtNames = [
    'ready',
    'click',
    'dragend',
    'recenter',
    'bounds_changed',
    'center_changed',
    'dblclick',
    'dragstart',
    'heading_change',
    'idle',
    'maptypeid_changed',
    'mousemove',
    'mouseout',
    'mouseover',
    'projection_changed',
    'resize',
    'rightclick',
    'tilesloaded',
    'tilt_changed',
    'zoom_changed'
];

export { wrapper as GoogleApiWrapper } from './GoogleApiComponent';
export { Marker } from './components/Marker';
export { InfoWindow } from './components/InfoWindow';
export { HeatMap } from './components/HeatMap';
export { Polygon } from './components/Polygon';
export { Polyline } from './components/Polyline';
export { Circle } from './components/Circle';
export { Rectangle } from './components/Rectangle';


const orderLocationReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.order]
        case 'remove':
            const orderIndex = state.findIndex(item => item.name === action.order.name)
            if (orderIndex < 0) {
                return state
            }
            const update = [...state]
            update.splice(orderIndex, 1)
            return update
        default:
            return state
    }
}

const userLocationReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.userLoc]
        case 'remove':
            const userIndex = state.findIndex(item => item.name === action.userLoc.name)

            if (userIndex < 0) return state
            const update = [...state]
            update.splice(userIndex, 1)
            return update
        default:
            return state
    }

}




const Map = (props) => {

    const dispatch = useDispatch()
    const userID = props.match.params.id

    //const [currentLocation, setCurrentLocation] = useReducer(currentLocationReducer, [])i


    const [orderLocation, setOrderLocation] = useReducer(orderLocationReducer, [])
    const [userLocation, setUserLocation] = useReducer(userLocationReducer, [])

    const position = useSelector((state) => state.ui.position)


    const addUserLoc = (userLoc) => {
        setUserLocation({ userLoc, type: 'add' })
    }

    const removeUserLoc = (userLoc) => {
        setUserLocation({ userLoc, type: 'remove' })
    }

    const addOrderLoc = (order) => {
        setOrderLocation({ order, type: 'add' })
    }

    const removeOrderLoc = (order) => {
        setOrderLocation({ order, type: 'remove' })
    }

    const orders = useSelector((state) => state.ui.orders)
    const user = useSelector((state) => state.login.usuario.user)

    const getOrdersByDealer = () => {
        orders.map((order) => {
            if (user.rol === 'domiciliario' && order.domiciliario.id === user._id) {
                addOrderLoc(order)
            }
        })
    }


    // Get Orders
    useEffect(() => {
        dispatch(getAllOrderAction())
        getOrdersByDealer()

    }, [dispatch, orders])

    // ComponentDidMount and ComponentDidUpdate and componentWillUnmount
    const mounted = useRef();
    const map = useRef()
    useEffect((prevProps, prevState) => { // Lookup how Manipulate the state with functional component
        if (!mounted.current) {
            // ComponentDidMount logic
            if (props.centerAroundCurrentLocation) {
                if (navigator && navigator.geolocation) {
                    geoPromise = makeCancelable(
                        new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrenPosition(resolve, reject)
                        })
                    )
                    geoPromise.promise.then(pos => {
                        const coords = pos.coords
                        const newLocation = {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }3
                        addUserLoc(newLocation)
                    })
                        .catch(e => e)
                }
            }

            loadMap()
            mounted.current = true;
        } else {
            // ComponentDidUpdate logic
            if (prevProps.google !== props.google) loadMap()
            if (props.visible !== prevProps.visible) restyleMap()
            if (props.center !== prevProps.center) addUserLoc(props.center)
            if (prevState.userLocation !== userLocation) recenterMap()
            if (props.bounds && props.bounds !== prevProps.bounds) map.fitBounds(props.bounds)
        }

        // ComponentWillUnmount Logic
        const { google } = props
        if (geoPromise) {
            geoPromise.cancel()
        }
        Object.keys(listeners).forEach(e => {
            google.maps.event.removeListener(listeners[e])
        })

    });

    // Get currentLocation by dealer online
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(getFromUserPositionAction(userID))
        }, 5000)
        return () => clearTimeout(timer)
    }, [dispatch, position, userID])

    const loadMap = () => {
        if (props && props.google) {
            const { google } = props
            const maps = google.maps

            const mapRef = mapRef.current
            const node = ReactDOM.findDOMNode(mapRef)
            const curr = userLocation
            const center = new maps.LatLng(curr.lat, curr.lng)

            const mapTypeIds = props.google.maps.MapTypeId || {}
            const mapTypeFromProps = String(props.mapType).toUpperCase()

            const mapConfig = Object.assign(
                {},
                {
                    mapTypeId: mapTypeIds[mapTypeFromProps],
                    center: center,
                    zoom: this.props.zoom,
                    maxZoom: this.props.maxZoom,
                    minZoom: this.props.minZoom,
                    clickableIcons: !!this.props.clickableIcons,
                    disableDefaultUI: this.props.disableDefaultUI,
                    zoomControl: this.props.zoomControl,
                    zoomControlOptions: this.props.zoomControlOptions,
                    mapTypeControl: this.props.mapTypeControl,
                    mapTypeControlOptions: this.props.mapTypeControlOptions,
                    scaleControl: this.props.scaleControl,
                    streetViewControl: this.props.streetViewControl,
                    streetViewControlOptions: this.props.streetViewControlOptions,
                    panControl: this.props.panControl,
                    rotateControl: this.props.rotateControl,
                    fullscreenControl: this.props.fullscreenControl,
                    scrollwheel: this.props.scrollwheel,
                    draggable: this.props.draggable,
                    draggableCursor: this.props.draggableCursor,
                    keyboardShortcuts: this.props.keyboardShortcuts,
                    disableDoubleClickZoom: this.props.disableDoubleClickZoom,
                    noClear: this.props.noClear,
                    styles: this.props.styles,
                    gestureHandling: this.props.gestureHandling
                }
            );

            Object.keys(mapConfig).forEach(key => {
                // Allow to configure mapConfig with false
                if (mapConfig[key] === null) delete mapConfig[key]
            })

            map = new maps.Map(node, mapConfig)

            evtNames.forEach(e => {
                listeners[e] = map.addListener(e, handleEvent(e))
            })
            maps.event.trigger(map, 'ready')
            forceUpdate()
        }
    }
    const handleEvent = (evtName) => {
        let timeout
        const handlerName = `on${camelize(evtName)}`

        return e => {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            timeout = setTimeout(() => {
                if (props[handlerName]) props[handlerName](props, map, e)
            }, 0)
        }
    }

    const recenterMap = () => {
        const map = map
        const { google } = props
        if (!google) return
        const maps = google.maps

        if (map) {
            let center = userLocation
            if (!(center instanceof google.maps.LatLng)) center = new google.maps.LatLng(center.lat, center.lng)
            map.setCenter(center)
            maps.event.trigger(map, 'recenter')
        }
    }

    const restyleMap = () => {
        if (map) {
            const { google } = props
            google.maps.event.trigger(map, 'resize')
        }
    }

    const renderChildren = () => {
        const { children } = props

        if (!children) return

        return React.children.map(children, c => {
            if (!c) return
            return React.cloneElement(c, {
                map: map,
                google: props.google,
                mapCenter: userLocation
            })
        })
    }

    const style = Object.assign({}, mapStyles.map, props.style, {
        display: props.visible ? 'inherit' : 'none'
    });

    const containerStyles = Object.assign(
        {},
        mapStyles.container,
        props.containerStyle
    );

    return (

        <div style={containerStyles} className={props.className}>
            <div style={style} ref={mapRef}>
                Loading map...
        </div>
            {renderChildren()}
        </div>
    )

}

export default Map
*/