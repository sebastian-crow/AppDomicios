import eventsReducer from "./eventsReducer";
//import rotateReducer from "./rotateReducer";
import locationReducer from "./locationReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    events: eventsReducer,
    location: locationReducer
    //rotate: rotateReducer
})

export default allReducers