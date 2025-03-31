const {
  FileOperator,
  JsonCsvOperator,
  getPath,
  decrypt,
} = require("../utils/index"); // Function to decrypt data
const config = require("../../config/config"); // Configuration file
/**
 * Decrypts passwords in a JSON file and writes the updated data to a new file.
 *
 * This function performs the following steps:
 * 1. Loads encrypted account data from a JSON file specified by `ENCRYPTED` environment variable.
 * 2. Removes the first record, which acts as an encryption header indicator.
 * 3. Decrypts passwords for all accounts in the data structure.
 * 4. Updates the file's state to "decrypted".
 * 5. Saves the decrypted data to a file specified by the `DECRYPTED` environment variable.
 */
const decryPassInJson = function () {
  // Step 1: Load and parse the encrypted JSON data
  const encryptedFilePath = getPath(config.ENCRYPTED); // Path to the encrypted JSON file
  let jsonData = FileOperator.readFromFile(encryptedFilePath); // Read raw data
  jsonData = JsonCsvOperator.parsingJsonData(jsonData); // Parse data into a JSON object

  // Step 2: Remove the first record (encryption header indicator)
  // Assuming this is a convention to mark encrypted files
  delete jsonData.header; // Explicitly removing a header key if present

  // Step 3: Decrypt the password for each account in the "domains" array
  jsonData["domains"].forEach((domain) => {
    domain["accounts"].forEach((account) => {
      // Decrypt and replace the password field
      const { encryptedData, iv } = account.password; // Extract encryption details
      account.password = String(decrypt(encryptedData, iv)); // Decrypt password
    });
  });

  // Update the file's state to indicate it's decrypted
  jsonData["state"] = "decrypted";

  // Step 4: Convert the updated JSON object to a JSON string
  const decryptedData = JsonCsvOperator.stringDataToWriteinJson(jsonData);

  // Step 5: Write the decrypted data to the output file
  const decryptedFilePath = getPath(config.DECRYPTED); // Path for the decrypted JSON file
  FileOperator.writeToFile(decryptedFilePath, decryptedData);
};

module.exports = {
  decryPassInJson, // Export the function for external use
};
