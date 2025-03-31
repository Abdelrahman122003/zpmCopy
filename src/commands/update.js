const {
  FileOperator,
  JsonCsvOperator,
  AccountOperator,
  getPath,
} = require("../utils/index");
const Handler = require("./handler");
const config = require("../../config/config");
const update = (record) => {
  let jsonData = FileOperator.readFromFile(getPath(config.ENCRYPTED));
  jsonData = JsonCsvOperator.parsingJsonData(jsonData);
  const { domains, domainIndex, accountIndex } = Handler.fetchAccount(
    jsonData,
    record
  );
  if (accountIndex < 0) {
    return "NotExist";
  }
  AccountOperator.updateAccount(domains[domainIndex]["accounts"], record);
  jsonData = JsonCsvOperator.stringDataToWriteinJson(jsonData);

  // // Step 4: Write the updated JSON string back to the file
  FileOperator.writeToFile(getPath(config.ENCRYPTED), jsonData); // Save changes to the file

  return "Updated";
};
module.exports = {
  update,
};
