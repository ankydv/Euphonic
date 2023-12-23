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