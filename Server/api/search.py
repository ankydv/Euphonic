from fastapi import APIRouter, HTTPException
from ytmusicapi import YTMusic

yt = YTMusic()
router = APIRouter()

#route to search items
@router.get("/search/{q}")
def search(q:str, type:str=None):
    try:
        res = yt.search(q,type)
        return res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/searchSuggestions/{q}')
def getSearchSuggestions(q:str, detail:bool=True):
    try:
        res = yt.get_search_suggestions(q,detailed_runs=detail)
        return res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))