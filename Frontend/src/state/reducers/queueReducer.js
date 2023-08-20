const reducer = (state = [], action) => {
    if(action.type === 'sendQueue'){
        return action.payload;
    }
    else{
        return state;
    }
}

export default reducer;