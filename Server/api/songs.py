from fastapi import APIRouter
import pytube

router = APIRouter()

@router.get("/songinfo/{id}")
def read_song(id: str):
    return pytube.YouTube(f'v={id}').vid_info

# sub_router = APIRouter()

# @sub_router.get("/title")
# def get_song_title(id: str):
#     return pytube.YouTube(f'v={id}').title

# @sub_router.get("/streaming_data")
# def get_song_title(id: str):
#     return pytube.YouTube(f'v={id}').streaming_data

# router.include_router(sub_router, prefix="/songinfo/{id}", tags=["songinfo"])
