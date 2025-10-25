import { getAuth } from "@clerk/express";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const requireAuth = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) return next(new ErrorHandler(401, "Unauthorized"));
  req.userId = userId;
  next();
};
