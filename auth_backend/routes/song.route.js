import { Router } from "express";
import { fetchuser } from "../middleware/user.middleware.js";
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

router.get("/fetchhistory", validateFetchHistory, fetchuser, fetchHistory);


router.post("/addhistory", fetchuser, addHistory);

router.get("/fetchliked", fetchuser, fetchLiked);

router.get("/checkLiked/:videoId", fetchuser, isLiked);

router.post("/addliked", fetchuser, addLiked);

router.delete("/deleteLiked/:videoId", fetchuser, deleteLiked);

export default router;