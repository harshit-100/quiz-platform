class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function createAuthenticationError(res, message, statusCode) {
  const error = new AppError(message, statusCode);
  return res.status(error.statusCode).json({
    status: "error",
    message: error.message,
  });
}

module.exports = { createAuthenticationError };
