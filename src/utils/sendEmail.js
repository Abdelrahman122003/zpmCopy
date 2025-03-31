const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const postmark = require("postmark");

// var serverToken = "03a75de2-6ff5-4dd9-be90-c04e271e2776";
// var client = new postmark.ServerClient(serverToken);

// client.sendEmail({
//   From: "11410120210205@stud.cu.edu.eg",
//   To: "elliotsalem3@gmail.com",
//   Subject: "Test",
//   TextBody: "Hello from Postmark!",
// });

// //

const crypto = require("crypto");
const { connect } = require("http2");

// i want to generate otp
function generateSecureCode() {
  const code = crypto.randomInt(100000, 1000000).toString();
  return code;
}
// function generateOTP(length = 6) {
//   let otp = "";
//   for (let i = 0; i < length; i++) {
//     otp += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
//   }
//   console.log(`Generator with math : ${otp}`);
// }

// generateOTP();
// generateSecureCode();
// sent it in mail

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Zoombie-CLI Email",
    pass: "enter your password",
  },
});

const mailOptions = {
  from: "Zoombie-CLI Email",
  to: "user email",
  subject: "OTP From Zoombie-CLI For Authentication",
  html: (
    <div>
      <p>OTP = ${otp}</p>
    </div>
  ),
};

transporter.sendMail(mailOptions, function (error, success) {
  if (error) console.log(error);
  else console.log("Send Email : ", success);
});

// 3) json web token

const generateToken = function () {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    otp: generateSecureCode(),
  };

  // Set the expiration time to 1 minute
  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: process.env.EXPIRES_In,
  });

  return token;
};
token = generateToken();
console.log(`token: ${token}`);

const decodeToken = function (token) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    // Verify and decode the token
    const decodedData = jwt.verify(token, jwtSecretKey);
    return decodedData; // Return the decoded data (e.g., time, otp)
  } catch (error) {
    // Handle invalid or expired tokens
    console.error("Invalid or expired token", error.message);
    return null;
  }
};
// const respose = ;

setInterval(() => {
  console.log(decodeToken(token).otp);
}, 1000);
// console.log(generateToken());
// 4) use env variable
