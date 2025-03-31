const { Account } = require("../models/account");
const { extractDomain } = require("./domainParser");
const { encrypt } = require("./encryDecryModules");
class AccountOperator {
  // function to Account object into {username, password, domainName}
  static reconstruction = function (records) {
    return records.map((record) => {
      return new Account(record[0].toLowerCase(), record[2], record[3]);
    });
  };
  // private method (hendler for getAccountsByDomain for add and getPass command
  static getAccountsByDomain = function (data, domainName) {
    const domainIndex = data.findIndex(
      (domain) => domain.domainName === extractDomain(domainName)
    );
    // if the domain exist return index from zero to account.length for this domain - 1
    // else return -1
    return domainIndex;
  };

  static sameUsername = function (account, newAccount) {
    return account.username === newAccount.username;
  };

  // return index for account for specifc domain
  static accountIndex = function (accounts, newAccount) {
    return accounts.findIndex((account) =>
      AccountOperator.sameUsername(account, newAccount)
    );
  };
  // add account if account has normal password or encrypted password(iv, encryptedData)    // Flag to check if the site already exists in the data
  static addAccount = function (data, domainIndex, account) {
    // // If static the siteName doesn't exist in the data, add a new entry
    if (domainIndex === -1) {
      data.push({
        domainName: extractDomain(account.domainName),
        accounts: delete account.domainName && [account],
      });
    } else {
      // delet domainName from data that will be stored to avoid duplicated information
      delete account.domainName;
      data[domainIndex]["accounts"].push(account);
    }
    // Update the value directly without returning it, because it is a non-primitive type(records updated)
  };

  // update account for specific domain
  static updateAccount = function (accounts, account) {
    const accountIndex = AccountOperator.accountIndex(accounts, account);
    accounts[accountIndex]["password"] = encrypt(account.newPassword);
  };
  // delete account with username
  static deleteAccount = function (accounts, accountIndex) {
    return accounts.splice(accountIndex, 1);
  };
}
module.exports = {
  AccountOperator,
};
