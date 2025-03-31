// 1) Node Modules
// 2) User Defined Modules
const { LoggerConstants } = require("../utils/loggerConstants");
// 3) Third Party Modules(npm)
class Logger {
  static setColor(Log) {
    Log.color =
      Log.status === LoggerConstants.STATUS.SUCCESS
        ? LoggerConstants.CONSOLE_COLORS.SUCCESS
        : Log.status === LoggerConstants.STATUS.FAILED
        ? LoggerConstants.CONSOLE_COLORS.FAILED
        : LoggerConstants.CONSOLE_COLORS.DATA;
  }
  static logMessage(Log) {
    // set color depend on
    this.setColor(Log);
    if (Log.message) {
      console.log(
        `${Log.color}[${Log.status}]${LoggerConstants.CONSOLE_COLORS.DEFAULT}: ${Log.message}`
      );
    }
    if (Log.data) {
      console.log(
        `${LoggerConstants.CONSOLE_COLORS.DATA}Data ⤵${LoggerConstants.CONSOLE_COLORS.DEFAULT}`
      );
      console.table(Log.data);
    }
  }
}

module.exports = {
  Logger,
};
