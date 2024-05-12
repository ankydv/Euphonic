import OTP from "../models/otp.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { transporter, fromEmails } from "../configs/mailer.config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { validationResult } from "express-validator";
import { ErrorHandler } from "../utils/ErrorHandler.js";

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
