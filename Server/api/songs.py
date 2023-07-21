from fastapi import APIRouter, HTTPException

import pytube
from pytube import exceptions

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

# sub_router = APIRouter()

# @sub_router.get("/title")
# def getSongTitle(id: str):
#     return pytube.YouTube(f'v={id}').title

# @sub_router.get("/streaming_data")
# def getStreaming_data(id: str):
#     return pytube.YouTube(f'v={id}').streaming_data

# router.include_router(sub_router, prefix="/songinfo/{id}", tags=["songinfo"])
