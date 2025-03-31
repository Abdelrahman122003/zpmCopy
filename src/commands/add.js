const { JsonCsvOperator, FileOperator, getPath } = require("../utils/index"); // Handles account-related operations
const config = require("../../config/config"); // Configuration file
const Handler = require("./handler");
/**
 * Adds a new account entry (domainName, username, password) to the decrypted JSON file.
 *
 * This function:
 * 1. Reads the existing records from a JSON file.
 * 2. Adds the new account data to the records.
 * 3. Updates the JSON structure with the new data.
 * 4. Writes the updated data back to the file.
 *
 * @param {Object} account - The new account to add. It should include the following properties:
 *   @property {string} domainName - The domain name for the account.
 *   @property {string} username - The username associated with the account.
 *   @property {string} password - The password for the account.
 */
const add = function (account) {
  // Step 1: Read and parse existing records from the JSON file
  const filePath = getPath(config.ENCRYPTED); // Resolve the path to the JSON file
  let data = FileOperator.readFromFile(filePath); // Read raw JSON data from the file
  data = JsonCsvOperator.parsingJsonData(data); // Convert raw JSON data into usable format

  // // // Step 2: Add the new account data to the "domains" section
  // AccountOperator.addAccount(data["domains"], account);
  const response = Handler.add(data, account);
  // // Step 3: Convert the updated data back to a JSON string
  const updatedData = JsonCsvOperator.stringDataToWriteinJson(data);

  // // Step 4: Write the updated JSON string back to the file
  FileOperator.writeToFile(filePath, updatedData); // Save changes to the file

  return response;
};

module.exports = {
  add, // Export the add function for external use
};
// zpm add facebook zoombie 834ufjkej
