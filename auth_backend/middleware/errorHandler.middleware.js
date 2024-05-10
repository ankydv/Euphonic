import { ErrorHandler } from '../utils/ErrorHandler.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    // If the error is an instance of ErrorHandler, return a JSON response with the error message and status code
    return res.status(err.statusCode || 500).json({ error: err.message });
  } else {
    // For other types of errors, return a generic JSON response
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default errorHandlerMiddleware;