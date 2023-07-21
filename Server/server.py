from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import songs, search

app = FastAPI()

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

#test api route
@app.get('/')
def ankit():
    return "Server is working fine"

prefix = "/api"
app.include_router(songs.router, prefix=prefix, tags=["songs"])
app.include_router(search.router, prefix=prefix, tags=["search"])