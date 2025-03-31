// const { Log } = require("../models/log");
// const { logger, STATUS } = require("./logger");
// const { getErrorMessage, TYPES } = require("./messageHandler");
const parser = require("csv-parse/sync");
class JsonCsvOperator {
  static parsingJsonData = function (data) {
    try {
      let parsedData = JSON.parse(data);
      return parsedData;
    } catch (err) {
      console.error("Error Occeared during parse data");
      //   logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.PARSE)));
    }
  };
  static parsingCsvData = function (data) {
    try {
      let parsedData = parser.parse(data, {
        colums: true,
        skip_empty_lines: true,
      });
      return parsedData;
    } catch (err) {
      console.error("Error Occeared during parse data");
    }
  };

  static stringDataToWriteinJson = function (data) {
    try {
      const stringData = JSON.stringify(data);
      return stringData;
    } catch (err) {
      console.error("Error Occeared during convert data to String");
      //   logger(new Log(STATUS.FAILED, getErrorMessage(TYPES.STRINGIFY)));
    }
  };
}

module.exports = {
  JsonCsvOperator,
};
