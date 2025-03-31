const {
  FileOperator,
  JsonCsvOperator,
  getPath,
  AccountOperator,
} = require("../utils/index"); // Handles account-related operations
const Handler = require("./handler");
const config = require("../../config/config"); // Configuration file
/**
 * Converts a CSV file to JSON format and integrates it with existing JSON data.
 *
 * This function performs the following steps:
 * 1. Reads and parses records from the input CSV file.
 * 2. Reads and parses existing JSON data from a specified file.
 * 3. Transforms the CSV records into a simplified, custom structure.
 * 4. Merges the transformed records with the existing JSON data.
 * 5. Writes the updated JSON data back to the file.
 *
 * @param {string} pathFile - The path to the input CSV file.
 */
const fromCsvFileToJson = async function (pathFile) {
  // Step 1: Read and parse records from the CSV file
  let records = FileOperator.readFromFile(pathFile); // Read raw CSV data
  records = JsonCsvOperator.parsingCsvData(records); // Parse CSV data into an array of records

  // Step 2: Read and parse existing JSON data
  const jsonFile = getPath(config.ENCRYPTED);
  let jsonData = FileOperator.readFromFile(jsonFile); // Load existing JSON file
  jsonData = JsonCsvOperator.parsingJsonData(jsonData); // Parse JSON data into an object

  // Step 3: Transform CSV records into a custom structure
  // For instance, mapping { username, name, url, password, note }
  // to a simpler format like { username, domainName, password }
  records = AccountOperator.reconstruction(records);

  // Step 4: Merge transformed records into the existing JSON data
  records.forEach((record) => {
    Handler.add(jsonData, record);
  });

  // Step 5: Convert the updated data back into JSON format
  const updatedJsonData = JsonCsvOperator.stringDataToWriteinJson(jsonData);

  // Step 6: Write the updated JSON data back to the file
  FileOperator.writeToFile(jsonFile, updatedJsonData); // Save the updated JSON data
};

module.exports = {
  fromCsvFileToJson, // Export the function for external use
};
