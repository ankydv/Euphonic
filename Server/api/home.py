from fastapi import APIRouter, HTTPException
from ytmusicapi import YTMusic

yt = YTMusic(location='IN')
router = APIRouter()

#to get songs on homepage
@router.get('/home')
def getHome():
    try:
        a = yt.get_home()
        return a
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/moods')
def test():
    try:
        return yt.get_mood_categories()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))