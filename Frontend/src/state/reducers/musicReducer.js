const reducer = (state = null, action) => {
    if(action.type === 'sendMusic'){
        return action.payload;
    }
    else{
        return state;
    }
}

const musicInfoReducer = (state = null, action) => {
    if(action.type === 'sendMusicInfo'){
        return action.payload;
    }
    else{
        return state;
    }
}
 
export default reducer;
export {musicInfoReducer};