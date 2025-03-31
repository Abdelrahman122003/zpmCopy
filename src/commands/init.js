// Import required utility functions for JSON conversion and file writing
const { FileOperator, JsonCsvOperator, getPath } = require("../utils/index");
const config = require("../../config/config"); // Configuration file
/**
 * Initializes user data with the provided email and the current username from environment variables.
 *
 * This function performs the following steps:
 * 1. Extracts the username from the `USER` environment variable.
 * 2. Combines the provided email and the extracted username into a `records` object.
 * 3. Initializes an empty JSON structure for decrypted data with a `state` and empty `domains`.
 * 4. Writes both the initialized data and the user configuration to their respective files.
 *
 * @param {string} email - The email address to be added to the user data.
 *
 * @example
 * // Example usage
 * initWithZpm("user@example.com");
 */
const initWithZpm = (email) => {
  // Step 1: Retrieve the username from the environment variable `USER`
  const username = config.USER || "unknown_user"; // Provide fallback if USER is undefined

  // Step 2: Create a `records` object containing the email and username
  const records = {
    email,
    username,
  };

  // Step 3: Initialize a structure for decrypted data
  let initialStrucDecry = {
    state: "decrypted",
    domains: [],
  };
  let initialStrucEncry = {
    state: "encrypted",
    domains: [],
  };

  // Convert the initial structure to JSON format
  initialStrucDecry =
    JsonCsvOperator.stringDataToWriteinJson(initialStrucDecry);
  initialStrucEncry =
    JsonCsvOperator.stringDataToWriteinJson(initialStrucEncry);

  // Write the initial structure to the file specified by `DECRYPTED`
  const decryptedFilePath = getPath(config.DECRYPTED);
  const encryptedFilePath = getPath(config.ENCRYPTED);
  FileOperator.writeToFile(decryptedFilePath, initialStrucDecry);
  FileOperator.writeToFile(encryptedFilePath, initialStrucEncry);

  // Step 4: Convert the `records` object to JSON format
  const recordsJson = JsonCsvOperator.stringDataToWriteinJson(records);

  // Write the `records` JSON data to the file specified by `USER_CONFIG`
  const userConfigFilePath = getPath(config.USER_CONFIG);
  FileOperator.writeToFile(userConfigFilePath, recordsJson);
};

// Export the initWithZpm function for use in other modules
module.exports = {
  initWithZpm,
};
