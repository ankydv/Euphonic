import { combineReducers } from "redux";
import musicReducer from "./musicReducer";
import queueReducer, { queueIndexReducer } from "./queueReducer"

const reducers = combineReducers({
    music:musicReducer,
    queue:queueReducer,
    queueIndex:queueIndexReducer
})

export default reducers;