const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const generateToken = function (otp) {
  console.log("");
  let jwtSecretKey = config.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    otp: otp,
  };

  // Set the expiration time to 1 minute
  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: config.EXPIRES_IN,
  });

  return token;
};

const decodeToken = function (token) {
  let jwtSecretKey = config.JWT_SECRET_KEY;

  // Verify and decode the token
  return jwt.verify(token, jwtSecretKey);
};
const isTokenExpired = function (token) {
  let jwtSecretKey = config.JWT_SECRET_KEY;
  try {
    // Verify and decode the token + Returns 0 if the token is valid.
    jwt.verify(token, jwtSecretKey);
    return 0; // Token is valid (not expired)
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Returns 1 if the token has expired.
      return 1;
    } else {
      // Returns -1 if the token is invalid (any other error).
      throw new Error("Invalid token", error.message);
    }
  }
};

// let token = generateToken();
// // token = String(token).slice(2, 19);
// console.log(decodeToken(token));
// console.log(`from token: `, isTokenExpired(token));

module.exports = {
  generateToken,
  decodeToken,
  isTokenExpired,
};
