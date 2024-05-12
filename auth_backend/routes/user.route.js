import { Router } from "express";
import { body, query } from "express-validator";
import { fetchuser } from "../middleware/user.middleware.js";
import {
  signUp,
  signIn,
  getUserDetails,
  isNewUser,
} from "../controllers/user.controller.js";
import { config } from "dotenv";
config();

const router = Router();

//route 1 create a user using: post "/api/auth/signup"
router.post("/signup", signUp);

//route 2 create a user using: post "/api/auth/signin"
router.post(
  "/signin",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").notEmpty(),
  ],
  signIn
);

//route 3 get loged in user details using: post "/api/auth/getuser"
router.post("/getuser", fetchuser, getUserDetails);

//route 4 to check if user is already registered before initiating signup process.
router.get(
  "/isNewUser",
  [
    query("email", "Email is required").exists(),
    query("email", "Invalid Email").isEmail(),
  ],
  isNewUser
);

export default router;