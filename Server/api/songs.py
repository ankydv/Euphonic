from fastapi import APIRouter, HTTPException

import pytube
from pytube import exceptions
from ytmusicapi import YTMusic

yt = YTMusic()
router = APIRouter()

#get all info of song using videoid
@router.get("/songinfo/{id}")
def getSongInfo(id: str):
    try:
        info = pytube.YouTube(f'v={id}').vid_info
        if info['playabilityStatus']['status'] == 'ERROR':    # pytube return error as a value if vid is wrong
            raise HTTPException(status_code=404, detail='No song/video found with that id')
        return info
    except exceptions.RegexMatchError as e:
        raise HTTPException(status_code=400, detail='Invalid Format of song/video ID')

@router.get('/watchPlaylist')
def getWatchPlaylist(v):
    try:
        return yt.get_watch_playlist(v)
    except Exception as e:
        raise HTTPException(400, e)
