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
const isVideoSwitchedOnReducer = (state = localStorage.getItem('isVideoSwitchedOn') === "true" ? true : false, action) => {
    if(action.type === 'sendIsVideoSwitchedOn'){
        localStorage.setItem('isVideoSwitchedOn', action.payload)
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