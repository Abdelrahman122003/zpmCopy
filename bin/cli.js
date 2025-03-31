#!/usr/bin/env node
const { Command } = require("commander");
const { Action } = require("./action");
const { closeSession, RunScript } = require("../src/utils/index");

const program = new Command();
// ********************
// First, create the files if they do not exist (`decrypt.json`, `encrypt.json`, `user.json`, and `session.json`).
RunScript.touchDataFiles();
// ********************

// ********************
// Second, close the session if it has expired.
closeSession();
// ********************
program
  .command("init <email>")
  .description("Initialize the tool with your email (arguments: email)")
  .action((email) => {
    Action.init(email);
  });
program
  .command("csvToJson <csvPathFile>")
  .description("Convert CSV to JSON (arguments: csvPathFile)")
  .action((csvPathFile) => {
    Action.csvToJson(csvPathFile);
  });
program
  .command("genPass")
  .description("Generates a complex password")
  .action(() => {
    Action.genPass();
  });
program
  .command("add <domainName> <username> <password>")
  .description("Add account (arguments: domainName, username, password)")
  .action((domainName, username, password) => {
    const data = {
      domainName,
      username,
      password,
    };
    Action.add(data);
  });
program
  .command("update <domainName> <username> <newPassword>")
  .description("Update account (arguments: domainName, username, newPassword)")
  .action((domainName, username, newPassword) => {
    const data = {
      domainName,
      username,
      newPassword,
    };
    Action.updatePassword(data);
  });
program
  .command("delete <domainName> <username>")
  .description("delete account (arguments: domainName, username)")
  .action((domainName, username) => {
    const data = {
      domainName,
      username,
    };
    Action.deleteAccount(data);
  });
program
  .command("getPass <domain>")
  .description("Retrieve accounts by domain (arguments: domainName)")
  .action((domain) => {
    Action.getPasswords(domain);
  });
program
  .command("encryptAll")
  .description("Encrypt all passwords in a JSON file (no arguments)")
  .action(Action.encryptAllPasswords);
program
  .command("decryptAll")
  .description("Decrypt all passwords in a JSON file (no arguments)")
  .action(Action.decryptAllPasswords);
program
  .command("encryptPass <password>")
  .description("Encrypt a password (arguments: password)")
  .action((password) => {
    Action.encryptPassword(password);
    // `The password has been successfully encrypted using IV -> [${encrypted.iv}], and the encrypted data is -> [${encrypted.encryptedData}]`
  });
program
  .command("decryptPass <encryptedData> <iv>")
  .description("Decrypt a password (arguments: encryptedData, iv)")
  .action((encryptedData, iv) => {
    //////beforeCommand();

    const data = {
      encryptedData: encryptedData,
      iv: iv,
    };
    Action.dcryptPassword(data);
  });
program
  .command("auth")
  .description("Authenticate session with JWT and OTP (no arguments)")
  .action(Action.authentication);
program
  .command("login <otp>")
  .description("Log in to your account (arguments: otp)")
  .action((otp) => {
    Action.login(otp);
  });
program
  .command("backup <path>")
  .description("Make backup for your passwords (arguments: path)")
  .action((path) => {
    Action.backup(path);
  });
program
  .command("restore <path>")
  .description("Make restore for your passwords (arguments: path)")
  .action((path) => {
    Action.restore(path);
  });
program.parse(process.argv);
