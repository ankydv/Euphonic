const reducer = (state = null, action) => {
    if(action.type === 'sendAddHistoryResponse'){
        return action.payload;
    }
    else{
        return state;
    }
}

export default reducer;