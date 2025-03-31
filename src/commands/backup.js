const { RunScript } = require("../utils/index");
const backup = (path) => {
  // run script that is copy encrypted file into the above path
  RunScript.makeBackup(path);
};

module.exports = {
  backup,
};
