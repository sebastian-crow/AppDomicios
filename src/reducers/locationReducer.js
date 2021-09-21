function locationReducer(state = [], action) {
    switch(action.type) {
        case "GET_LOCATION":
            return [...state, action.paylaod]
        default:
            return state
    }
}

export default locationReducer