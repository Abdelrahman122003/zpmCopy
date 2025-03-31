const fs = require("fs");
const path = require("path");
const pathIsExist = function (path) {
  return fs.existsSync(path);
};

const isCSVFile = function (pathFile) {
  // Return true if it's a .csv file
  return path.extname(pathFile) === ".csv";
};
const isJSONFile = function (pathFile) {
  // Return true if it's a .json file
  return path.extname(pathFile) === ".json";
};
// const checkEncryptOrDecrypt = function (pathFile, state) {
//   let data = FileOperator.readFromFile(getPath(pathFile));
//   data = JsonCsvOperator.parsingJsonData(data);
//   return String(data["state"]) === state;
// };
module.exports = {
  pathIsExist,
  isCSVFile,
  isJSONFile,
};
