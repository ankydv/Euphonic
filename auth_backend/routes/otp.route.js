import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otp.controller.js";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/sendOtp",
  [
    body("email", "Email is required").exists(),
    body("email", "Enter a valid email").isEmail(),
  ],
  sendOtp
);

router.post(
  "/verify-otp",
  [
    body("email", "Enter a valid email").isEmail(),
    body("otp", "OTP field is missing").exists(),
    body("otp", "OTP can only contain numbers").isNumeric(),
    body("otp", "Invalid OTP").trim().isLength({ min: 6, max: 6 }),
  ],
  verifyOtp
);

export default router;