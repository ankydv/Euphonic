import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import admin from "../configs/firebase.config.js"
import { clerkClient, getAuth } from "@clerk/express";

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
    console.log(req.user);
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

export const firebase = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const {email, picture} = decodedToken;
    const existedUser = await User.findOne({
      email,
    });
    console.log(decodedToken)
    if (existedUser) {
      const authToken = existedUser.generateRefreshToken();
      return res.json({authToken})
    }
    const [firstName, lastName] = decodedToken.name.split(' ');
    const uid = decodedToken.uid;
    const user = await User.create({
      firstName,
      lastName: lastName || "",
      email,
      uid,
      picture
    });
    const authToken = user.generateRefreshToken();
    return res.json({authToken})

  } catch (error) {
    console.log(error.message)
    res.status(401).send('Unauthorized');
  }
});

export const signUpUsingClerk = asyncHandler(async (req, res) => {
  try{
    const { userId } = getAuth(req);
    const clerkUser = await clerkClient.users.getUser(userId);

    if (!clerkUser) {
      return next(new ErrorHandler(404, "Clerk user not found"));
    }
    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;
    if (!primaryEmail) {
      return next(new ErrorHandler(400, "Primary email not found for Clerk user"));
    }
    const existedUser = await User.findOne({
      email: primaryEmail,
    });
    if(existedUser)
        return res.status(200).json({authToken: existedUser.generateRefreshToken()})
    const user = await User.create({
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      email: primaryEmail,
      picture: clerkUser.imageUrl,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      authToken: user.generateRefreshToken(),
    });
  }
  catch(error){
    return next(new ErrorHandler(500, error.message));
  }
});