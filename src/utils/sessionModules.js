const { FileOperator } = require("./fileOperator");
const { JsonCsvOperator } = require("./jsonOperator");
const { getPath } = require("./pathModules");
const { isTokenExpired } = require("./jwtManager");
const config = require("../../config/config");
/**
 * Checks the status of a user session by verifying the token and its expiration status.
 * It retrieves the token and session information from a JSON file and returns a message
 * indicating whether the session is valid, expired, or closed.
 *
 * @returns {string} A message indicating the status of the session:
 *                   - "Opened" if the session is open and the token is not expired,
 *                   - "Closed" if the token has expired,
 *                   - "NotLoggedIn" if the session is marked as closed.
 */
const sessionIsOpen = function () {
  // Initialize a message to indicate the session status
  let message = "Opened";

  // Extract data from the JSON file
  let data = FileOperator.readFromFile(getPath(config.SESSION));
  data = JsonCsvOperator.parsingJsonData(data);
  // Construct an object with the token and session status
  data = { token: data["token"], session: data["session"] };

  // Check if the token is expired and update the message accordingly
  message = isTokenExpired(data.token) ? "Closed" : message;

  // Check if the session is closed and update the message accordingly
  message = !data.session ? "NotLoggedIn" : message;

  // Return the final message indicating the session status
  return message;
};
const closeSession = () => {
  let data = FileOperator.readFromFile(getPath(config.SESSION));
  data = JsonCsvOperator.parsingJsonData(data);
  if (data === undefined) {
    return;
  }

  if (isTokenExpired(data["token"])) {
    data = { token: data["token"], session: false };
  }
  data = JsonCsvOperator.stringDataToWriteinJson(data);
  FileOperator.writeToFile(getPath(config.SESSION), data);
};
module.exports = {
  sessionIsOpen,
  closeSession,
};
