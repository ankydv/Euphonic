import { body, validationResult, query } from "express-validator";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";

export const validateFetchHistory = asyncHandler(async (req, res, next) => {
  await Promise.all([
    query("page").optional().isNumeric().withMessage("Page must be numeric").run(req),
  ]);

  const errors = validationResult(req);
  console.log(req.query);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(400, errors.array()[0].msg))
  }

  next();
});