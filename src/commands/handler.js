const {
  AccountOperator,
  encrypt,
  FileOperator,
  JsonCsvOperator,
  getPath,
} = require("../utils/index");
const config = require("../../config/config"); // Configuration file
class Handler {
  static getUsername = () => {
    let data = FileOperator.readFromFile(getPath(config.USER_CONFIG));

    data = JsonCsvOperator.parsingJsonData(data);

    return data.username;
  };
  static fetchAccount = (jsonData, record) => {
    // 1)get domain index in data
    let domainIndex = AccountOperator.getAccountsByDomain(
      jsonData["domains"],
      record.domainName
    );
    let accounts =
      domainIndex < 0 ? null : jsonData["domains"][domainIndex]["accounts"];
    // 2) check if this accoun with same password is exist before
    let accountIndex = -1;
    if (accounts) {
      // for ignore duplicated account with same username
      accountIndex = AccountOperator.accountIndex(accounts, record);
    }
    // data domainIndex, accountIndex
    return { domains: jsonData["domains"], domainIndex, accountIndex };
  };
  static add = (jsonData, record) => {
    const { domains, domainIndex, accountIndex } = Handler.fetchAccount(
      jsonData,
      record
    );
    if (accountIndex < 0) {
      const account = {
        username: record.username,
        domainName: record.domainName,
        password: encrypt(record.password),
      };
      // Add each transformed record to "domains
      AccountOperator.addAccount(domains, domainIndex, account);
    } else {
      return "Duplicated";
    }
    return "Added";
  };
}

module.exports = Handler;
