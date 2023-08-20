import { combineReducers } from "redux";
import musicReducer from "./musicReducer";
import queueReducer from "./queueReducer"

const reducers = combineReducers({
    music:musicReducer,
    queue:queueReducer
})

export default reducers;