from fastapi import APIRouter, HTTPException

from pytube import exceptions
from ytmusicapi import YTMusic;
from .youtube import player
from services.ytToken import refresh_token

router = APIRouter()
yt = YTMusic(location='IN')

#get all info of song using videoid
@router.get("/songinfo/{id}")
def getSongInfo(id: str, accessToken:str=None):
    try:
        info = player(id, accessToken=accessToken)
        if info['playabilityStatus']['status'] == 'ERROR':    # pytube return error as a value if vid is wrong
            raise HTTPException(status_code=404, detail='No song/video found with that id')
        return info
    except exceptions.RegexMatchError as e:
        raise HTTPException(status_code=400, detail='Invalid Format of song/video ID')

@router.get('/watchlist/{videoId}')
def getWatchList(videoId:str):
    try:
        return yt.get_watch_playlist(videoId)
    except Exception as e:
         raise HTTPException(status_code=400, detail=str(e))

@router.get('/refreshtoken')
def refreshToken():
    try:
        return refresh_token()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
