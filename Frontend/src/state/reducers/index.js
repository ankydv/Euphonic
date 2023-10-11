import { combineReducers } from "redux";
import musicReducer from "./musicReducer";
import queueReducer, { queueIndexReducer } from "./queueReducer"
import authReducer from "./authReducers";
import reducer from "./historyReducers";

const reducers = combineReducers({
    music:musicReducer,
    queue:queueReducer,
    queueIndex:queueIndexReducer,
    auth:authReducer,
    addHistoryResponse:reducer
})

export default reducers;