const {
  generateToken,
  generateSecureOtp,
  getPath,
  FileOperator,
  JsonCsvOperator,
  Email,
} = require("../utils/index");
const config = require("../../config/config");
/**
 * Authenticates a user by generating a secure OTP (One-Time Password) and token.
 * It then stores the token in a JSON file and sends the OTP to the specified email address.
 *
 * @returns {string} The generated OTP if the email was sent successfully; otherwise, returns "ERROR".
 */

const authentication = function () {
  // Generate a secure OTP
  let otp = generateSecureOtp();

  // Generate a token based on the OTP
  let token = generateToken(otp);

  // Convert the token to JSON format
  token = JsonCsvOperator.stringDataToWriteinJson({
    token: token,
    session: false,
  });

  // Store the token in a JSON file in the specified directory
  FileOperator.writeToFile(getPath(config.SESSION), token);

  // Create a new Email instance with the receiver's address and the generated OTP
  const email = new Email(config.RECEIVER, otp);
  // Send the OTP to the specified email address
  // Async function that throws an error if any issues occur.
  email.sendEmail();
  // Return the OTP
  return otp;
};

module.exports = {
  authentication,
};
