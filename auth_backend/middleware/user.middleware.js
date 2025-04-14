import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { clerkClient, getAuth } from "@clerk/express";
import User from "../models/user.model.js";
config();

const jwt_secret = process.env.REFRESH_TOKEN_SECRET;

//get the user from jwt token and add id to req object
export const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  const { userId } = getAuth(req)
  if (!token && !userId) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
  try {
    if(token){
      const data = jwt.verify(token, jwt_secret);
      req.user = data.user;
    }
    else if (userId) {
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
      const mongoUser = await User.findOne({ email: primaryEmail }).select("_id"); // Only select the ID

      if (!mongoUser) {
         return next(new ErrorHandler(404, "User not found in application database"));
      } else {
         req.user = { id: mongoUser._id };
      }
    }
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        error: "Token expired. Please authenticate using a new token",
      });
    }
    return res.status(401).send({
      error: error,
    });
  }
};


