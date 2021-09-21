function eventsReducer(state = [], action) {
    switch (action.type) {
        case "START_ACTION":
            return [...state, action.payload]
        case "STOP_ACTION":
            return state + action.payload
        case "GET_LOCATION":
            return state + action.payload
        default:
            return state
    }
}

export default eventsReducer


// Obtener datos de la geolocalizacion del componente map por medio del store