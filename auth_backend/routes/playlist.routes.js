import express from "express";
import { createPlaylist, getPlaylists } from "../controllers/playlist.controller.js";
import { requireAuth } from "../middleware/clerk.middleware.js"; // Clerk middleware

const router = express.Router();

//GET /api/playlist/
router.get("/", requireAuth, getPlaylists);

// POST /api/playlist/create
router.post("/create", requireAuth, createPlaylist);

export default router;
