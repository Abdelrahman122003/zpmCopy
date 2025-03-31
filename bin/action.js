const { LoggerConstants } = require("../src/utils/loggerConstants");
const { MessageHandler } = require("../src/utils/messageHandler");
const { Logger } = require("../src/utils/logger");
const { Log } = require("../src/models/log");
const figlet = require("figlet");

const {
  isCSVFile,
  pathIsExist,
  isJSONFile,
} = require("../src/utils/validateModules");
const { sessionIsOpen } = require("../src/utils/sessionModules");

const {
  initWithZpm,
  fromCsvFileToJson,
  add,
  update,
  getPassword,
  encryPassInJson,
  decryPassInJson,
  decryptPassword,
  encryptPassword,
  authentication,
  login,
  generatePass,
  deleteAcc,
  backup,
  restore,
} = require("../src/commands/index");
const Handler = require("../src/commands/handler");
loginMode = false;
class Action {
  // Init Command => PARAMS: email
  static init = (email) => {
    // 1) extract email from args
    // 2) Check if existence of this email in real world
    // 3) call function that is add this email in config file
    initWithZpm(email);
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        MessageHandler.getSuccessMessage(LoggerConstants.MESSAGE_TYPES.INIT)
      )
    );

    console.log(
      LoggerConstants.CONSOLE_COLORS.DATA,
      figlet.textSync("ZoombiePM", { horizontalLayout: "full" })
    );
    const data = Handler.getUsername();
    console.log(`Hey, ${data}`);
  };
  // The function #loggsForSession is private
  static #loggsForSession = () => {
    let message = sessionIsOpen();
    if (message === "Closed") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.SESSION_EXPIRED
          )
        )
      );
      process.exit();
    }
    if (message === "NotLoggedIn") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.LOGGED_IN
          )
        )
      );
      process.exit();
    }
  };
  // csvToJson Command => PARAMS: csvFile
  static csvToJson = (csvFile) => {
    if (!pathIsExist(csvFile)) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.PATH)
        )
      );
      return;
    }
    if (!isCSVFile(csvFile)) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.CSVFILE)
        )
      );
      return;
    }
    fromCsvFileToJson(csvFile);
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        MessageHandler.getSuccessMessage(LoggerConstants.MESSAGE_TYPES.CSVFILE)
      )
    );
  };
  // GeneratePassword Command => PARAMS: NO
  static genPass = () => {
    const password = generatePass();
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        undefined,
        `${MessageHandler.getSuccessMessage(
          LoggerConstants.MESSAGE_TYPES.GEN_PASS
        )}${password}`
      )
    );
  };
  // Add Commad => PARAMS: data(domain, username, password)
  static add = (data) => {
    if (!data.domainName || !data.username || !data.password) {
      return Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.FIELDS)
        )
      );
    }
    const response = add(data);
    if (response === "Duplicated") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.ADDED_DATA
          ),
          data
        )
      );
    } else {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.SUCCESS,
          MessageHandler.getSuccessMessage(
            LoggerConstants.MESSAGE_TYPES.ADDED_DATA
          ),
          data
        )
      );
    }
  };
  // UpdateAccount Command => PARAMS: data(domainName, username, newPassword)
  static updatePassword = (data) => {
    let response = update(data);
    if (response === "NotExist") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.NOT_EXIST
          ),
          data
        )
      );
    } else {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.SUCCESS,
          MessageHandler.getSuccessMessage(
            LoggerConstants.MESSAGE_TYPES.UPDATE_ACCOUNT
          ),
          data
        )
      );
    }
  };
  // DeleteAccount Command => PARAMS: data(domainName, username)
  static deleteAccount = (data) => {
    const response = deleteAcc(data);
    if (response === "NotExist") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.NOT_EXIST
          ),
          data
        )
      );
    } else {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.SUCCESS,
          MessageHandler.getSuccessMessage(
            LoggerConstants.MESSAGE_TYPES.DELETE_ACCOUNT
          ),
          data
        )
      );
    }
  };
  // GetPasswords Command => PARAMS: domainName
  static getPasswords = (domainName) => {
    // this.#loggsForSession();
    if (domainName === undefined) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.FIELDS)
        )
      );
      return;
    }
    let accounts = getPassword(domainName);
    if (accounts && accounts.length > 0) {
      Logger.logMessage(
        new Log(LoggerConstants.STATUS.SUCCESS, undefined, accounts)
      );
    } else {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.SUCCESS,
          MessageHandler.getSuccessMessage(
            LoggerConstants.MESSAGE_TYPES.ACCOUNTS_DATA
          )
        )
      );
    }
  };
  // EncryptAllPasswords Command => PARAMS: NO
  static encryptAllPasswords = () => {
    encryPassInJson();
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        MessageHandler.getSuccessMessage(LoggerConstants.MESSAGE_TYPES.ENCRYPT)
      )
    );
  };
  // DecryptAllPasswords Command => PARAMS: NO
  static decryptAllPasswords = () => {
    decryPassInJson();
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        MessageHandler.getSuccessMessage(LoggerConstants.MESSAGE_TYPES.DECRYPT)
      )
    );
  };
  // EncryptPassword Command => PARAMS: password
  static encryptPassword = (password) => {
    if (!password) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.FIELDS)
        )
      );
      return;
    }
    const encrypted = encryptPassword(password);
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        MessageHandler.getSuccessMessage(
          LoggerConstants.MESSAGE_TYPES.ENCRYPT_PASS
        ),
        encrypted
      )
    );
  };
  // DecryptPassword Command => PARAMS: data{encryptedDAta, iv}
  static dcryptPassword = (data) => {
    const descision = (data.encryptedData && data.iv) ?? "Missing";
    if (descision === "Missing") {
      return Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.FIELDS)
        )
      );
    }
    const decryptedPassword = decryptPassword(data);
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        MessageHandler.getSuccessMessage(
          LoggerConstants.MESSAGE_TYPES.DECRYPT_PASS
        ),
        decryptedPassword
      )
    );
  };
  // Authentication Command => PARAMS: NO
  static authentication = () => {
    const otp = authentication();
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        MessageHandler.getSuccessMessage(LoggerConstants.MESSAGE_TYPES.AUTH)
      )
    );
  };
  // Login Command => PARAMS: otp
  static login = (otp) => {
    if (!otp) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.FIELDS)
        )
      );
      return;
    }
    let message = login(otp);
    if (String(otp).length != 6) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.OTP_INVALID
          )
        )
      );
      return;
    }
    if (message === "Empty") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.NO_TOKEN)
        )
      );
      return;
    }
    if (message === "Expired") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.SESSION_EXPIRED
          )
        )
      );
      return;
    }
    if (message === "Wrong") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.OTP_WRONG
          )
        )
      );
      return;
    }

    if (message === "LoggedIn") {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.SUCCESS,
          MessageHandler.getSuccessMessage(
            LoggerConstants.MESSAGE_TYPES.LOGGED_IN
          )
        )
      );
      return;
    }
    Logger.logMessage(
      new Log(
        LoggerConstants.STATUS.SUCCESS,
        MessageHandler.getSuccessMessage(LoggerConstants.MESSAGE_TYPES.OTP)
      )
    );
    return;
  };
  // Backup Command => PARAMS: path
  static backup = (path) => {
    if (!pathIsExist(path)) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.PATH)
        )
      );
    } else {
      // call backup command
      backup(path);
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.SUCCESS,
          MessageHandler.getSuccessMessage(
            LoggerConstants.MESSAGE_TYPES.BACKUP
          ),
          path
        )
      );
    }
  };
  // Restore Command => PARAMS: path
  static restore = (path) => {
    if (!pathIsExist(path)) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.PATH)
        )
      );
    } else if (!isJSONFile(path)) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(
            LoggerConstants.MESSAGE_TYPES.JSON_FILE
          )
        )
      );
    } else {
      // call backup command
      restore(path);
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.SUCCESS,
          MessageHandler.getSuccessMessage(
            LoggerConstants.MESSAGE_TYPES.RESTORE
          ),
          path
        )
      );
    }
  };
}
module.exports = {
  Action,
};
// Action.backup("/home/boda/backup");
