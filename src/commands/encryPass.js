const { encrypt } = require("../utils/index");

/**
 * Encrypts a given password.
 *
 * This function takes a plaintext password as input and returns the encrypted version
 * of the password using the encryption function.
 *
 * @param {string} password - The plaintext password to be encrypted.
 * @returns {string} The encrypted password.
 */
const encryptPassword = function (password) {
  return encrypt(password);
};

module.exports = {
  encryptPassword,
};
