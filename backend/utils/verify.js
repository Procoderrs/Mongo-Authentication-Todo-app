const jwt = require('jsonwebtoken');
const createError = require('./error');

const verifyToken = async function (req, res, next) {
  const { access_token, refreshToken } = req.cookies;

  try {
    // Step 1: Verify the Access Token
    jwt.verify(access_token, process.env.JWT, (err, user) => {
      if (err) {
        console.log("Access token expired or invalid. Verifying refresh token.");

        // Step 2: Verify the Refresh Token if Access Token is invalid
        jwt.verify(refreshToken, process.env.JWT, (err, user) => {
          if (err) {
            return res.status(401).json({ error: "Not authenticated" });
          }

          // Step 3: Generate a new Access Token
          const newAccessToken = jwt.sign(
            { id: user.id },
            process.env.JWT,
            { expiresIn: "7d" }
          );

          res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          return res.status(200).json({ message: "Token refreshed", token: newAccessToken });
        });
      } else {
        // Access Token is still valid
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.error("Error in persistLogin:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = verifyToken;
