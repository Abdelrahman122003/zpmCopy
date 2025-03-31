const {
  FileOperator,
  JsonCsvOperator,
  getPath,
  AccountOperator,
  decrypt,
} = require("../utils/index"); // Function to filter accounts by domain name
const config = require("../../config/config"); // Configuration file
/**
 * Retrieves accounts associated with a specified domain name from a JSON file.
 *
 * This function performs the following steps:
 * 1. Loads account data from the JSON file specified by the `DECRYPTED` environment variable.
 * 2. Searches for accounts matching the provided domain name.
 * 3. Returns all matching accounts or undefined if no matches are found.
 *
 * @param {string} domainName - The domain name to search for in the account data.
 * @returns {Array|undefined} An array of accounts that match the specified domain name,
 *                            or undefined if no accounts are found.
 */
const getPassword = function (domainName) {
  // Step 1: Load and parse the account data from the JSON file
  const decryptedFilePath = getPath(config.ENCRYPTED); // Path to the decrypted JSON file
  let jsonData = FileOperator.readFromFile(decryptedFilePath); // Read raw JSON data
  jsonData = JsonCsvOperator.parsingJsonData(jsonData); // Parse data into a JSON object
  // Step 2: Retrieve all accounts that match the provided domain name
  const index = AccountOperator.getAccountsByDomain(
    jsonData["domains"],
    domainName
  );
  const accounts =
    index > -1 ? jsonData["domains"][index]["accounts"] : undefined;
  if (accounts !== undefined) {
    accounts.forEach((account) => {
      account.password = decrypt(
        account.password.encryptedData,
        account.password.iv
      );
    });
  }
  // // Step 3: Return the matching accounts, or undefined if no matches are found
  return accounts;
};

module.exports = { getPassword }; // Export the function for external use
