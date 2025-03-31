const crypto = require("crypto");

function generateSecureOtp() {
  const code = crypto.randomInt(100000, 1000000).toString();
  return code;
}
const verification = function (otp, inputOtp) {
  return String(otp) === String(inputOtp);
};
module.exports = {
  generateSecureOtp,
  verification,
};
