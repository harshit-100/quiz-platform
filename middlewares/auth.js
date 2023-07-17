var jwt = require("jsonwebtoken");
const { createAuthenticationError } = require("../utils/errorPage");

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(createAuthenticationError(res, "Authentication Invalid", 401));
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, String(process.env.JWT_SECRET));
    req.user = payload;
    next();
  } catch (error) {
    return next(createAuthenticationError(res, "Authentication Invalid", 401));
  }
};

module.exports = { authorizeUser };
