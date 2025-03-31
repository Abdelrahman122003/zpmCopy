class LoggerConstants {
  static STATUS = {
    SUCCESS: "SUCCESS",
    FAILED: "ERROR",
    LOG: "LOG",
  };

  static CONSOLE_COLORS = {
    FAILED: "\x1b[31m",
    SUCCESS: "\x1b[32m",
    DATA: "\x1b[33m",
    DEFAULT: "\x1b[0m",
  };
  static MESSAGE_TYPES = {
    GOOD: "good",
    BAD: "bad",
    PATH: "path",
    CSVFILE: "csvFile",
    JSON_FILE: "json-file",
    INTERNET: "internet",
    ADDED_DATA: "addedData",
    FIELDS: "fields",
    ACCOUNTS_DATA: "accountsData",
    ENCRYPT: "encrypt",
    DECRYPT: "decrypt",
    ENCRYPT_PASS: "encryptPass",
    DECRYPT_PASS: "decryptPass",
    AUTH: "authentication",
    LOGGED_IN: "logged-in",
    OTP: "otp",
    SESSION_EXPIRED: "otp-expired",
    OTP_WRONG: "otp-wrong",
    OTP_INVALID: "otp-invalid",
    NO_TOKEN: "no-token",
    INIT: "init",
    GEN_PASS: "generate-password",
    UPDATE_ACCOUNT: "update-password",
    DELETE_ACCOUNT: "delete-password",
    NOT_EXIST: "not-exist",
    BACKUP: "backup",
    RESTORE: "restore",
  };
  static TAGS = {
    // for add command
    MISSING_FIELD: "missing-field",
    ADDED: "added",
    // for login command
    INVALID_OTP: "invalid-otp",
    WRONG_OTP: "wrong-otp",
    EXPIRED_OTP: "expired-otp",
    LOGIN: "login",
    LOGGED_IN: "logged-in",
    // for getPass command
    GET_PASS: "get-password-successfully",

    // for csvToJson command
    NOT_PATH: "path-not-exist",
    NOT_CSV: "not-csv-file",
    DATA_JSON: "data-transfer-in-json",

    // for encrypt password
    ENCRYPTED: "encrypted",

    // for decrypt password
    DECRYPTED: "decrypted",
  };
}

module.exports = {
  LoggerConstants,
};
