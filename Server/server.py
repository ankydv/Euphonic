from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from api import songs, search, home

app = FastAPI()

load_dotenv()
client_server = os.getenv("CLIENT_SERVER")

origins=[
   '*',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#test api route
@app.get('/')
def ankit():
    return "Server is working fine"

prefix = "/api"
app.include_router(songs.router, prefix=prefix, tags=["songs"])
app.include_router(search.router, prefix=prefix, tags=["search"])
app.include_router(home.router, prefix=prefix, tags=["home"])