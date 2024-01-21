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

export {audioRefReducer, videoRefReducer}