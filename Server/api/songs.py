from fastapi import APIRouter, HTTPException

import pytube
from pytube import exceptions
from ytmusicapi import YTMusic;
from pytube.cipher import Cipher
from urllib.parse import parse_qs
import requests
import syncedlyrics, re

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

def parse_lyrics(lyrics_text):
    lines = lyrics_text.split('\n')
    parsed_lines = []
    for line in lines:
        if '[' in line and ']' in line:
            match = re.match(r'\[(\d+):(\d+\.\d+)\](.*)', line)
            if match:
                minutes = int(match.group(1))
                seconds = float(match.group(2))
                time = minutes * 60 + seconds
                text = match.group(3).strip()
                parsed_lines.append({'time': time, 'text': text})
    return parsed_lines

@router.get('/lyrics')
def get_lyrics(song_title: str):
    try:
        lrc = syncedlyrics.search(song_title, providers=["Megalobiz"], synced_only=True)
        if lrc:
            parsed_lyrics = parse_lyrics(lrc)
            return {"lyrics": parsed_lyrics}
        else:
            raise HTTPException(status_code=404, detail="Lyrics not found or returned None.")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Something went wrong")
    
# a = get_lyrics('we rollin')
# print(a)