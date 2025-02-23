import OTP from "../models/otp.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { transporter, fromEmails } from "../configs/mailer.config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { validationResult } from "express-validator";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { resolve } from "path";
import { readFileSync } from "fs";
import User from "../models/user.model.js";
import jwt from "../utils/token.js";

export const sendOtp = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    return next(new ErrorHandler(400, errors.array()[0].msg));
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const { email } = req.body;
  const updatedOTP = await OTP.findOneAndUpdate(
    { email: email },
    { email: email, otp: otp },
    { upsert: true, new: true }
  );
  try {
    const currentFileURL = import.meta.url;
    const currentFilePath = fileURLToPath(currentFileURL);
    const otpPath = path.resolve(
      path.dirname(currentFilePath),
      "../views/emails/otpEmail.html"
    );
    let otpTemplate = fs.readFileSync(otpPath, "utf-8");
    otpTemplate = otpTemplate.replace("{{otp}}", otp);
    const filePath = path.resolve(
      path.dirname(currentFilePath),
      "../views/emails/generalEmail.html"
    );
    let htmlTemplate = fs.readFileSync(filePath, "utf-8");
    htmlTemplate = htmlTemplate.replace("{{content}}", otpTemplate);
    const mailData = {
      from: fromEmails.verification,
      to: email,
      subject: "[Euphonic] Verify Your Mail",
      text: "Your OTP is",
      html: htmlTemplate,
    };
    transporter.sendMail(mailData);
    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
});

export const verifyOtp = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(400, errors.array()[0].msg));
    }
    const { email, otp } = req.body;
    const otpDoc = await OTP.findOne({ email });
    if (!otpDoc) {
      return next(new ErrorHandler(400, "OTP expired"))
    }
    if (otpDoc.otp !== otp) {
        return next(new ErrorHandler(400, "Invalid OTP"))
    }
    await OTP.deleteOne({ email });
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const resetPasswordMail = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    return res.json({ error: "User not found" });
  }

  const token = jwt.createJwtToken(user._id);
  const link = `${process.env.FRONTEND_URL}/resetpassword?token=${token}`;

  try {
    const innerPath = resolve('./views/emails/resetPassword.html');
    let innerTemplate = readFileSync(innerPath, 'utf-8');
    innerTemplate = innerTemplate.replace('{{link}}', link);

    const filePath = resolve('./views/emails/generalEmail.html');
    let htmlTemplate = readFileSync(filePath, 'utf-8');
    htmlTemplate = htmlTemplate.replace('{{content}}', innerTemplate);

    const mailData = {
      from: fromEmails.verification,
      to: email,
      subject: "[Euphonic] Reset Password",
      text: "Click on the link below to reset Password.",
      html: htmlTemplate
    };

    transporter.sendMail(mailData);
    res.json({ message: "Password reset link sent successfully!" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const token = req.query.token;
    const payload = jwt.verifyJwtToken(token);
    const user = await User.findById(payload.user).select("-password");

    user.password = req.body.password;
    await user.save();

    res.json({ message: "Password Changed Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};