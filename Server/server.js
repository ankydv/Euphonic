const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/search', async (req, res) => {
    const YTMusic = require("ytmusic-api").default;
    const ytmusic = await new YTMusic().initialize();
    const q = req.query['q'];
    const type = req.query['type'];
    if(type == "songs")
        res.send(await ytmusic.searchSongs(q));
    else if(type == "albums")
        res.send(await ytmusic.searchAlbums(q));
    else if(type == "artists")
        res.send(await ytmusic.searchArtists(q));
    else if(type == "playlists")
        res.send(await ytmusic.searchPlaylists(q));
    else
        res.status(404).send("Invalid type argument");
})

app.get('/song', async (req, res) => {
    const YTMusic = require("ytmusic-api").default;
    const ytmusic = await new YTMusic().initialize();
    const q = req.query['q'];
    res.send(await ytmusic.getSong(q));
})

app.listen(5000, () => {console.log('Running on port 5000')})