import express from "express";
import { createPlaylist, getPlaylists, addSongToPlaylist, removeSongFromPlaylist, deletePlaylist, addSongToPlaylists } from "../controllers/playlist.controller.js";
import { addSong } from "../middleware/song.middleware.js";

const router = express.Router();

router.get("/", getPlaylists);
router.post("/create", createPlaylist);
router.post("/add-song", addSong, addSongToPlaylist);
router.post("/add-song-bulk", addSong, addSongToPlaylists);
router.delete("/remove-song/:playlistId/song/:songId", removeSongFromPlaylist);
router.delete("/delete/:playlistId", deletePlaylist);


export default router;
