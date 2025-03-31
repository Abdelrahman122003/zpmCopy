const { exec } = require("child_process");
const { path } = require("path");
// const { Logger, LoggerConstants } = require("./index");
const { getAbsPath } = require("./pathModules");
const { Logger } = require("./logger");
const { LoggerConstants } = require("./loggerConstants");
const { Log } = require("../models/log");
const { stderr } = require("process");
class RunScript {
  static touchDataFiles = () => {
    // Path to your Bash script
    // const scriptPath = getAbsolutePath("../scripts/init.sh");
    const scriptPath = getAbsPath("../../scripts/init.sh");
    // Execute the script to initialize your files, which store everything (user data, token, encrypted data, decrypted data).
    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        Logger.logMessage(
          new Log(LoggerConstants.STATUS.FAILED, error.message)
        );
        return;
      }
      if (stderr) {
        Logger.logMessage(new Log(LoggerConstants.STATUS.FAILED, stderr));
        return;
      }
    });
  };
  static makeBackup = (path) => {
    const scriptPath = getAbsPath("../../scripts/copyBackupFile.sh");
    exec(`bash ${scriptPath} ${path}`, (error, stdout, stderr) => {
      if (error) {
        console.log("enter here");
        Logger.logMessage(
          new Log(LoggerConstants.STATUS.FAILED, error.message)
        );
        return;
      }
      if (stderr) {
        Logger.logMessage(new Log(LoggerConstants.STATUS.FAILED, stderr));
        return;
      }
    });
  };
  static makeRestore = (path) => {
    const scriptPath = getAbsPath("../../scripts/copyRestoreFile.sh");
    exec(`bash ${scriptPath} ${path}`, (error, stdout, stderr) => {
      if (error) {
        console.log("enter here");
        Logger.logMessage(
          new Log(LoggerConstants.STATUS.FAILED, error.message)
        );
        return;
      }
      if (stderr) {
        Logger.logMessage(new Log(LoggerConstants.STATUS.FAILED, stderr));
        return;
      }
    });
  };
}
module.exports = {
  RunScript,
};
