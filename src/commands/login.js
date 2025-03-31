const {
  FileOperator,
  JsonCsvOperator,
  verification,
  decodeToken,
  isTokenExpired,
  getPath,
} = require("../utils/index");
const config = require("../../config/config");
/**
 * Authenticates a user by verifying the provided OTP (One-Time Password) against a stored token.
 * It checks if the token is expired and performs OTP verification.
 * If the verification is successful, it updates the token to indicate a valid session.
 *
 * @param {string} inputOtp - The OTP input provided by the user for verification.
 * @returns {string} A message indicating the result of the authentication process:
 *                   - The decoded OTP if valid and not expired,
 *                   - "Expired" if the token is expired,
 *                   - "Wrong" if the OTP does not match.
 */
const login = function (inputOtp) {
  // Define the path to the JSON file that contains the stored token

  let tokenData = FileOperator.readFromFile(getPath(config.SESSION));
  // Extract token data from the JSON file
  tokenData = JsonCsvOperator.parsingJsonData(tokenData);

  if (!tokenData) return "Empty";

  // Create an object with the token and session status
  tokenData = { token: tokenData["token"], session: tokenData["session"] };
  // Initialize a message to indicate the token status
  let message = "Expired";

  // Check if the token is not expired
  if (!isTokenExpired(tokenData.token)) {
    // Decode the token to retrieve the stored OTP
    message = decodeToken(String(tokenData.token)).otp;
  }
  if (message !== "Expired" && tokenData.session) return "LoggedIn";

  // Verify the provided OTP against the stored OTP
  if (message !== "Expired" && !verification(message, inputOtp)) {
    // Set message to "Wrong" if the OTP does not match
    message = `Wrong`;
  }

  if (!["Wrong", "Expired"].includes(message)) {
    // Convert the token and session status to JSON format for storage
    let data = JsonCsvOperator.stringDataToWriteinJson({
      token: tokenData.token,
      session: true,
    });

    // Store the updated token data in the specified JSON file
    FileOperator.writeToFile(getPath(config.SESSION), data);
  }
  // Return the final message indicating the result of the authentication process
  return message;
};

module.exports = {
  login,
};
