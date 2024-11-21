class ApiError extends Error {
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
  sendResponse(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors || null,
    });
  }
}

export { ApiError };
