const localTheme = localStorage.getItem('theme')

const getDefaultTheme = () => {
    if(localTheme)
        return localTheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark'
    else
        return 'light'
}

const reducer = (state = getDefaultTheme(), action) => {
    if(action.type === 'sendTheme'){
        localStorage.setItem('theme', action.payload)
        return action.payload;
    }
    else{
        return state;
    }
}

export default reducer;