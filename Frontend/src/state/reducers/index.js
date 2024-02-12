import { combineReducers } from "redux";
import musicReducer, { musicInfoReducer } from "./musicReducer";
import queueReducer, { queueIndexReducer } from "./queueReducer"
import authReducer from "./authReducers";
import reducer from "./historyReducers";
import { audioRefReducer, videoRefReducer, isVideoSwitchedOnReducer, isVideoPictureInPicureReducer } from "./mediaRefReducers";
import themeReducer from "./themeReducer";

const reducers = combineReducers({
    music:musicReducer,
    queue:queueReducer,
    queueIndex:queueIndexReducer,
    auth:authReducer,
    addHistoryResponse:reducer,
    musicInfo:musicInfoReducer,
    audioRef:audioRefReducer,
    videoRef:videoRefReducer,
    isVideoSwitchedOn:isVideoSwitchedOnReducer,
    isVideoPictureInPicure:isVideoPictureInPicureReducer,
    theme:themeReducer,
})

export default reducers;