const { initWithZpm } = require("./init");
const { fromCsvFileToJson } = require("./csvFileToJson");
const { generatePass } = require("./generatePass");
const { add } = require("./add");
const { update } = require("./update");
const { deleteAcc } = require("./delete");
const { getPassword } = require("./getPass");
const { encryPassInJson } = require("./encryAll");
const { decryPassInJson } = require("./decryAll");
const { decryptPassword } = require("./decryPass");
const { encryptPassword } = require("./encryPass");
const { authentication } = require("./auth");
const { login } = require("./login");
const { backup } = require("./backup");
const { restore } = require("./restore");
// handlers

module.exports = {
  // commands
  initWithZpm,
  fromCsvFileToJson,
  add,
  update,
  deleteAcc,
  getPassword,
  encryPassInJson,
  decryPassInJson,
  decryptPassword,
  encryptPassword,
  authentication,
  login,
  generatePass,
  backup,
  restore,
};
