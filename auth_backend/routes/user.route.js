import { Router } from "express";
import { requireAuth } from "../middleware/clerk.middleware.js";
import {
  getUserDetails,
} from "../controllers/user.controller.js";
import { config } from "dotenv";
config();

const router = Router();

//route 1 get loged in user details using: get "/api/auth/getuser"
router.get("/getuser", requireAuth, getUserDetails);

export default router;