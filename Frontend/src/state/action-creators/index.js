export const sendMusic = (music) => {
    return (dispatch) => {
        dispatch({
            type: 'sendMusic',
            payload: music
        })
    }
}

export const sendMusicInfo = (musicInfo) => {
    return (dispatch) => {
        dispatch({
            type: 'sendMusicInfo',
            payload: musicInfo
        })
    }
}

export const sendQueue = (queue) => {
    return (dispatch) => {
        dispatch({
            type: 'sendQueue',
            payload: queue
        })
    }
}

export const sendQueueIndex = (index) => {
    return (dispatch) => {
        dispatch({
            type: 'sendQueueIndex',
            payload: index
        })
    }
}

export const login = (token) => {
    return (dispatch) => {
        dispatch({
            type: 'LOGIN',
            payload: token,
        })
    }
  };
  
  export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT',
        })
    }
  };

  export const sendAddHistoryResponse = (index) => {
    return (dispatch) => {
        dispatch({
            type: 'sendAddHistoryResponse',
            payload: index
        })
    }
}

export const sendAudioRef = (audioRef) => {
    return (dispatch) => {
        dispatch({
            type: 'sendAudioRef',
            payload: audioRef
        })
    }
}
export const sendVideoRef = (videoRef) => {
    return (dispatch) => {
        dispatch({
            type: 'sendVideoRef',
            payload: videoRef
        })
    }
}
export const sendVideoToggles = (videoToggles) => {
    return (dispatch) => {
        dispatch({
            type: 'sendVideoToggles',
            payload: videoToggles
        })
    }
}