const { decrypt } = require("../utils/index");

/**
 * Decrypts an encrypted password using the provided encrypted data and initialization vector (IV).
 *
 * This function takes an object containing the encrypted password data, extracts the
 * necessary fields, and returns the decrypted password as a string.
 *
 * @param {Object} encryPassData - The object containing the encrypted password data.
 * @param {string} encryPassData.encryptedData - The encrypted password.
 * @param {string} encryPassData.iv - The initialization vector used for decryption.
 * @returns {string} The decrypted password.
 */
const decryptPassword = function (encryPassData) {
  // console.log(encryPassData.encryptedData, "  ", encryPassData.iv);
  return decrypt(encryPassData.encryptedData, encryPassData.iv);
};

module.exports = {
  decryptPassword,
};
