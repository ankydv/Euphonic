const reducer = (state = [], action) => {
    if(action.type === 'sendQueue'){
        return action.payload;
    }
    else{
        return state;
    }
}

const queueIndexReducer = (state = 0, action) => {
    if(action.type === 'sendQueueIndex'){
        return action.payload;
    }
    else{
        return state;
    }
}

export {queueIndexReducer};
export default reducer;