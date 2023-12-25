from fastapi import APIRouter, HTTPException

from ytmusicapi import YTMusic;

router = APIRouter()
yt = YTMusic()

#get all info of song using videoid
@router.get("/artistinfo/{id}")
def getArtistInfo(id: str):
    try:
        info = yt.get_artist(id)
        return info
    except:
        raise HTTPException(status_code=400, detail='Something went wrong')