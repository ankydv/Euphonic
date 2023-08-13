from fastapi import APIRouter, HTTPException
from ytmusicapi import YTMusic

yt = YTMusic()
router = APIRouter()

#to get songs on homepage
@router.get('/charts')
def getCharts():
    try:
        return yt.get_charts()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/moods')
def test():
    try:
        return yt.get_mood_categories()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))