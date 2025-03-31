const {
  encrypt,
  FileOperator,
  JsonCsvOperator,
  getPath,
} = require("../utils/index");
const config = require("../../config/config"); // Configuration file
/**
 * Encrypts passwords in a JSON file and writes the updated data to a new file.
 *
 * This function performs the following steps:
 * 1. Loads account data from the JSON file specified by `DECRYPTED` environment variable.
 * 2. Encrypts the passwords for all accounts in the data structure.
 * 3. Updates the file's state to "encrypted".
 * 4. Saves the encrypted data to a file specified by the `ENCRYPTED` environment variable.
 */
const encryPassInJson = function () {
  // Step 1: Load and parse the decrypted JSON data
  const decryptedFilePath = getPath(config.DECRYPTED); // Path to the decrypted JSON file
  let jsonData = FileOperator.readFromFile(decryptedFilePath); // Read raw JSON data
  jsonData = JsonCsvOperator.parsingJsonData(jsonData); // Parse data into a JSON object

  // Step 2: Encrypt the password for each account in the "domains" array
  jsonData["domains"].forEach((domain) => {
    domain["accounts"].forEach((account) => {
      // Encrypt the password and update the account's password field
      account.password = encrypt(account.password);
    });
  });

  // Step 3: Update the file's state to indicate it's encrypted
  jsonData["state"] = "encrypted";

  // Step 4: Convert the updated JSON object to a JSON string
  const encryptedData = JsonCsvOperator.stringDataToWriteinJson(jsonData);

  // Step 5: Write the encrypted data to the output file
  const encryptedFilePath = getPath(config.ENCRYPTED); // Path for the encrypted JSON file
  FileOperator.writeToFile(encryptedFilePath, encryptedData);

  // console.log(`Encrypted data saved to: ${encryptedFilePath}`);
};

module.exports = {
  encryPassInJson, // Export the function for external use
};
