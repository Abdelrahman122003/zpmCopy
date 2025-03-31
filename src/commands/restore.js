const { RunScript } = require("../utils/index");
const restore = (path) => {
  // run script that is copy encrypted file into the above path
  RunScript.makeRestore(path);
};

module.exports = {
  restore,
};
