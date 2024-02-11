from fastapi import APIRouter, HTTPException

from ytmusicapi import YTMusic;

router = APIRouter()
yt = YTMusic(location='IN')

#get all info of song using videoid
@router.get("/albuminfo/{id}")
def getAlbumInfo(id: str):
    try:
        info = yt.get_album(id)
        return info
    except:
        raise HTTPException(status_code=400, detail='Something went wrong')

@router.get("/playlist/{id}")
def getPlayList(id: str):
    try:
        info = yt.get_playlist(id)
        return info
    except:
        raise HTTPException(status_code=400, detail='Something went wrong')