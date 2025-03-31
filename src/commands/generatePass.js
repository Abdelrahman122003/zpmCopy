const { PasswordGenerator } = require("../utils/index");

const generatePass = () => {
  const g = new PasswordGenerator(20, {
    lowerCaseLetters: true,
    upperCaseLetters: true,
    digits: true,
    specialCharacters: true,
  });

  return g.generate();
};
module.exports = {
  generatePass,
};
