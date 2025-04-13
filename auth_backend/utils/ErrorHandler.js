export class ErrorHandler extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function handleSocketError(socket, event, error, callback) {
  console.error(`Socket Error in ${event}:`, error.message);
  if(callback){ 
    callback({ success: false, message: error.message });
    return
  }
  socket.emit("error", { event, message: error.message });
}
