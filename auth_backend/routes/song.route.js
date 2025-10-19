import { Router } from "express";
import { requireAuth } from "../middleware/clerk.middleware.js";
import {
  addLiked,
  deleteLiked,
  fetchLiked,
  isLiked,
} from "../controllers/song.controller.js";

const router = Router();

router.get("/fetchliked", requireAuth, fetchLiked);

router.get("/checkLiked/:videoId", requireAuth, isLiked);

router.post("/addliked", requireAuth, addLiked);

router.delete("/deleteLiked/:videoId", requireAuth, deleteLiked);

export default router;