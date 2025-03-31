const fs = require("fs");
const { getPath } = require("./pathModules");
// const { Log } = require("../models/log");
// const { logger, STATUS } = require("./logger");
// const {
//   getSuccessMessage,
//   getErrorMessage,
//   TYPES,
// } = require("./messageHandler");

class FileOperator {
  static readFromFile = function (file) {
    try {
      const data = fs.readFileSync(file, "utf-8");
      return data;
    } catch (err) {
      console.error("Error Occeared during reading from file");
      // logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.FILE_READ)));
    }
  };

  static writeToFile = function (file, data) {
    return new Promise(function (reject) {
      fs.writeFileSync(file, data, "utf-8", (err) => {
        // logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.FILE_WRITE)))
        if (err) reject("Error Occeared during writing to file");
      });
    });
  };
}

module.exports = {
  FileOperator,
};
