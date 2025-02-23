import express, { query } from "express";
import { sendOtp, verifyOtp, resetPasswordMail, updatePassword } from "../controllers/verification.controller.js"
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

router.post(
  "/reset-password-mail",
  [
    body("email", "Email is required").exists(),
    body("email", "Enter a valid email").isEmail(),
  ],
  resetPasswordMail
);

router.post(
  "/update-password",
  [
    body("password", "Password is required").exists(),
    body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  ],
  updatePassword
);

export default router;