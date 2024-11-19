from fastapi import APIRouter, HTTPException, Query

import pytube
from pytube import exceptions
from ytmusicapi import YTMusic;
from pytube.cipher import Cipher
from urllib.parse import parse_qs
import requests
from yt_dlp import YoutubeDL

router = APIRouter()
yt = YTMusic(location='IN')

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

@router.get("/songurltest/{id}")
def getSongUrl(id: str):
    try:
        song = yt.get_song(videoId=id, signatureTimestamp=yt.get_signatureTimestamp(yt.get_basejs_url()))
        sigCiph = (song['streamingData']['adaptiveFormats'][0]['signatureCipher'])

        resp = requests.get(yt.get_basejs_url())
        PTC  = Cipher(js=resp.text)
        sc = parse_qs(sigCiph)
        sig = PTC.get_signature(ciphered_signature=sc["s"][0])
        url = sc["url"][0] + "&sig=" + sig + "&ratebypass=yes"
        return (url)
    except exceptions.RegexMatchError as e:
        raise HTTPException(status_code=400, detail='Invalid Format of song/video ID')

@router.get('/watchlist/{videoId}')
def getWatchList(videoId:str):
    try:
        return yt.get_watch_playlist(videoId)
    except Exception as e:
         raise HTTPException(status_code=400, detail=str(e))

def fetch_video_info(video_id: str):
    """
    Fetch video info using yt-dlp.
    """
    video_url = f"https://www.youtube.com/watch?v={video_id}"  # Construct full URL

    ydl_opts = {
        "format": "bestaudio/best",  # Get best format
        "dump_single_json": True,    # Fetch metadata in JSON
        "noplaylist": True,          # Ensure single video only
    }

    try:
        with YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(video_url, download=False)
            return info_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching video info: {str(e)}")

@router.get("/songinfov2/")
async def get_youtube_info(video_id: str = Query(..., description="YouTube video ID")):
    """
    API endpoint to get video info and streaming formats using videoId.
    """
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid video ID")

    video_info = fetch_video_info(video_id)
    if not video_info:
        raise HTTPException(status_code=404, detail="Video not found")

    # Prepare response with metadata and formats
    response = {
        "title": video_info.get("title"),
        "uploader": video_info.get("uploader"),
        "duration": video_info.get("duration"),
        "views": video_info.get("view_count"),
        "formats": [
            {
                "format_id": f.get("format_id"),
                "format_note": f.get("format_note"),  # Use get() to handle missing keys
                "ext": f.get("ext"),
                "url": f.get("url"),
            }
            for f in video_info.get("formats", [])
        ],
    }

    return response