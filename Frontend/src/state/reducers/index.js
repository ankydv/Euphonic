import { combineReducers } from "redux";
import musicReducer from "./musicReducer";
import queueReducer, { queueIndexReducer } from "./queueReducer"
import authReducer from "./authReducers";

const reducers = combineReducers({
    music:musicReducer,
    queue:queueReducer,
    queueIndex:queueIndexReducer,
    auth:authReducer
})

export default reducers;