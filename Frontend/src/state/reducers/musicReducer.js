const reducer = (state = null, action) => {
    if(action.type === 'sendMusic'){
        return action.payload;
    }
    else{
        return state;
    }
}

export default reducer;