const jwt = require('jsonwebtoken');
const createError = require('./error');

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.access_token; // Extract token from cookies

    console.log("Cookies received:", req.cookies);
    console.log("Token received:", token);

    if (!token) {
      console.log("Token missing");
      return next(createError(401, "Not authenticated")); // Token is required
    }

    // Verify the token
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        console.log("Token verification failed:", err);
        return next(createError(403, "Token is not valid"));
      }

      console.log("Decoded user:", user);
      req.user = user; // Attach user to the request
      next(); // Proceed to the next middleware
    });
  } catch (err) {
    console.error("Token verification failed:", err);
    next(createError(500, "Internal server error")); // Forward server errors
  }
};

module.exports = verifyToken;
