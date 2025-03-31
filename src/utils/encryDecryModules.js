const crypto = require("crypto");
const config = require("../../config/config");

// Define the algorithm and key
const algorithm = config.ALGORITHM_TYPE; // Use AES-128 for smaller key size
const key = config.ENCRYPTION_KEY; // 16 bytes key for AES-128

// Function to encrypt password
const encrypt = function (password) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv);
  let encrypted = cipher.update(password, "utf-8", "base64"); // Use base64 encoding
  encrypted += cipher.final("base64");
  return { iv: iv.toString("base64"), encryptedData: encrypted }; // Return the IV and encrypted data
};

// Function to decrypt password
const decrypt = (encryptedData, iv) => {
  const decipher = crypto.createDecipheriv(
    algorithm, // Ensure the same algorithm is used
    Buffer.from(key, "hex"), // Ensure the key is in hex format
    Buffer.from(iv, "base64")
  );
  let decrypted = decipher.update(encryptedData, "base64", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

module.exports = {
  encrypt,
  decrypt,
};
