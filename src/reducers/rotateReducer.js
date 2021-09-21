function rotateReducer(state, action) {
    switch (action.type) {
        case "STOP_ACTION":
            return state + action.payload
        default:
            return state
    }
}

export default rotateReducer