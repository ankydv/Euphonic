import express from "express";
import { addSong } from "../middleware/song.middleware.js";
import { addHistory, getHistory} from "../controllers/history.controller.js";

const router = express.Router();

router.get("/", getHistory);
router.post("/add", addSong, addHistory);

export default router;
