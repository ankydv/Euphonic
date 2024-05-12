import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName || email || password)) {
    return next(new ErrorHandler(400, "Please enter all fields"));
  }

  const existedUser = await User.findOne({
    email,
  });
  if (existedUser) {
    return next(new ErrorHandler(409, "User already exists"));
  }

  const user = await User.create({
    firstName,
    lastName: lastName || "",
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    return next(
      new ErrorHandler(500, "Something went wrong while registing the user")
    );
  }

  const authToken = createdUser.generateRefreshToken();

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    createdUser,
    authToken,
  });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(400, errors.array()[0].msg));
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(400, "User not registered"));
    }
    const passwordCompare = await user.matchPassword(password);
    if (!passwordCompare) {
      return next(new ErrorHandler(400, "Incorrect password"));
    }

    const authtoken = user.generateRefreshToken();
    res.json({ success: true, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

export const getUserDetails = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export const isNewUser = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(400, errors.array()[0].msg));
    }
    const { email } = req.query;
    console.log(email);
    const user = await User.findOne({ email: email });
    if (user) return next(new ErrorHandler(400, "Email already registered"));
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
});
