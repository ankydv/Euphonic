import { Router } from "express";
import { requireAuth } from "../middleware/clerk.middleware.js";
import {
  addHistory,
  addLiked,
  deleteLiked,
  fetchHistory,
  fetchLiked,
  isLiked,
} from "../controllers/song.controller.js";
import { validateFetchHistory } from "../middleware/validations/song.validation.js";

const router = Router();

router.get("/fetchhistory", validateFetchHistory, requireAuth, fetchHistory);


router.post("/addhistory", requireAuth, addHistory);

router.get("/fetchliked", requireAuth, fetchLiked);

router.get("/checkLiked/:videoId", requireAuth, isLiked);

router.post("/addliked", requireAuth, addLiked);

router.delete("/deleteLiked/:videoId", requireAuth, deleteLiked);

export default router;