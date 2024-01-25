const videoRefReducer = (state = null, action) => {
    if(action.type === 'sendVideoRef'){
        return action.payload;
    }
    else{
        return state;
    }
}
const audioRefReducer = (state = null, action) => {
    if(action.type === 'sendAudioRef'){
        return action.payload;
    }
    else{
        return state;
    }
}
const isVideoSwitchedOnReducer = (state = true, action) => {
    if(action.type === 'sendIsVideoSwitchedOn'){
        return action.payload;
    }
    else{
        return state;
    }
}
const isVideoPictureInPicureReducer = (state = false, action) => {
    if(action.type === 'sendisVideoPictureInPicure'){
        return action.payload;
    }
    else{
        return state;
    }
}
export {audioRefReducer, videoRefReducer, isVideoSwitchedOnReducer, isVideoPictureInPicureReducer}