export const sendMusic = (music) => {
    return (dispatch) => {
        dispatch({
            type: 'sendMusic',
            payload: music
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