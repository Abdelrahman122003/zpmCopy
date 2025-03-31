// 1) Node Moduels
// 2) User Defined Modules
const { LoggerConstants } = require("../utils/loggerConstants");
// 3) Third Party Modules(npm)
class MessageHandler {
  static message;
  static getErrorMessage(type) {
    switch (type) {
      // for example
      case LoggerConstants.MESSAGE_TYPES.PATH:
        this.message = "The specified path does not exist.";
        break;
      case LoggerConstants.MESSAGE_TYPES.CSVFILE:
        this.message = "The specified file is not a CSV file.";
        break;
      case LoggerConstants.MESSAGE_TYPES.FIELDS:
        this.message = "Required fields are missing.";
        break;
      case LoggerConstants.MESSAGE_TYPES.OTP_INVALID:
        this.message = "The OTP must be 6 digits, so this OTP is not valid.";
        break;
      case LoggerConstants.MESSAGE_TYPES.SESSION_EXPIRED:
        this.message =
          "This session has expired. Use the 'auth' command to create a new session with a new OTP.";
        break;
      case LoggerConstants.MESSAGE_TYPES.OTP_WRONG:
        this.message = "The provided OTP is incorrect. Please try again.";
        break;
      case LoggerConstants.MESSAGE_TYPES.NO_TOKEN:
        this.message = "No session exists. Run the 'auth' command to log in.";
        break;
      case LoggerConstants.MESSAGE_TYPES.LOGGED_IN:
        this.message =
          "You are not logged in. Please log in to open a session.";
        break;
      case LoggerConstants.MESSAGE_TYPES.INTERNET:
        this.message =
          "Failed to send the email. Possible cause: Internet connection issue.";
        break;
      case LoggerConstants.MESSAGE_TYPES.ADDED_DATA:
        this.message = "This account has already been added.";
        break;
      case LoggerConstants.MESSAGE_TYPES.NOT_EXIST:
        this.message = "This account does not exist.";
        break;
      case LoggerConstants.MESSAGE_TYPES.JSON_FILE:
        this.message = "This is not a JSON extension file.";
        break;
      default:
        this.message = "no-erros";
    }
    return this.message;
  }
  static getSuccessMessage(type) {
    switch (type) {
      case LoggerConstants.MESSAGE_TYPES.CSVFILE:
        this.message = "CSV file successfully converted to JSON.";
        break;
      case LoggerConstants.MESSAGE_TYPES.ADDED_DATA:
        this.message = "Data Added to file successfully.";
        break;
      case LoggerConstants.MESSAGE_TYPES.ACCOUNTS_DATA:
        this.message = "No accounts found for the provided domain name.";
        break;
      case LoggerConstants.MESSAGE_TYPES.ENCRYPT:
        this.message =
          "The data has been encrypted successfully in the encrypted file.";
        break;
      case LoggerConstants.MESSAGE_TYPES.DECRYPT:
        this.message =
          "The data has been decrypted successfully in the decrypted file.";
        break;
      case LoggerConstants.MESSAGE_TYPES.ENCRYPT_PASS:
        this.message = "The password has been encrypted successfully.";
        break;
      case LoggerConstants.MESSAGE_TYPES.DECRYPT_PASS:
        this.message = "The password has been decrypted successfully.";
        break;
      case LoggerConstants.MESSAGE_TYPES.AUTH:
        this.message =
          "The OTP has been sent to your email. Use the login command to start your session and access your passwords.";
        break;
      case LoggerConstants.MESSAGE_TYPES.OTP:
        this.message =
          "You provided the correct OTP. You are now in a session. Take your time before the session ends.";
        break;
      case LoggerConstants.MESSAGE_TYPES.LOGGED_IN:
        this.message = "You are logged in now. Take your time.";
        break;
      case LoggerConstants.MESSAGE_TYPES.INIT:
        this.message = "User information has been initialized successfully";
        break;
      case LoggerConstants.MESSAGE_TYPES.GEN_PASS:
        this.message = "The generated password is => ";
        break;
      case LoggerConstants.MESSAGE_TYPES.UPDATE_ACCOUNT:
        this.message = "This account has been updated successfully.";
        break;
      case LoggerConstants.MESSAGE_TYPES.DELETE_ACCOUNT:
        this.message = "This account has been deleted successfully.";
        break;
      case LoggerConstants.MESSAGE_TYPES.BACKUP:
        this.message =
          "The backup was successfully created for the following path: ";
        break;
      case LoggerConstants.MESSAGE_TYPES.RESTORE:
        this.message =
          "The restore was successfully completed for your directory data.";
    }
    return this.message;
  }
}

module.exports = {
  MessageHandler,
};
