from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ytmusicapi import YTMusic
from api import songs

app = FastAPI()
ytmusic = YTMusic()

origins=[
    'http://localhost:3000'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(songs.router, prefix="/api", tags=["songs"])

@app.get('/')
def ankit():
    return "Hello"

@app.get("/search")
def search(q,type=None):
    return ytmusic.search(q,type)