const path = require("path");
const config = require("../../config/config");
const getPath = function (fileName) {
  return path.join(__dirname, `${config.DIR_NAME}/${fileName}.json`);
};
const getAbsPath = function (pathFile) {
  return path.join(__dirname, pathFile);
};
module.exports = {
  getPath,
  getAbsPath,
};
