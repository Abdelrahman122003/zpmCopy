const nodemailer = require("nodemailer"); // Import nodemailer
const config = require("../../config/config");
// const { Logger, LoggerConstants, MessageHandler } = require("../utils/index");
const { Logger } = require("../utils/logger");
const { MessageHandler } = require("../utils/messageHandler");
const { LoggerConstants } = require("../utils/loggerConstants");
const { Log } = require("../models/log");
class Email {
  constructor(receiverEmail, otp) {
    // Accept receiverEmail as a parameter
    this.receiverEmail = receiverEmail; // Fix variable name to match the constructor parameter
    this.otp = otp;
    this.extractReceiverName();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASSWORD, // Ensure to access EMAIL_PASSWORD from config
      },
    });
  }
  extractReceiverName() {
    this.receiverName = String(this.receiverEmail).split("@")[0];
  }

  getOptions() {
    return {
      from: `ZPM Email<${config.EMAIL}>`, // Set from email (replace with your email)
      to: this.receiverEmail, // Use the instance variable for the receiver's email
      subject: "OTP From Zoombie-CLI For Authentication",
      html: this.body(),
    };
  }

  body() {
    return `
      <div
      style="
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 20px;
        max-width: 400px;
        margin: auto;
      "
    >
      <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
      <p>Dear <strong>${this.receiverName}</strong>,</p>
      <p>
        Thank you for initiating the authentication process. To verify your
        identity, please use the following One-Time Password (OTP):
      </p>
      <p style="font-size: 24px; font-weight: bold; color: #4caf50;">
        Your OTP is: <strong>${this.otp}</strong>
      </p>
      <p>
        This code is valid for a limited time and can only be used once. Please
        do not share it with anyone.
      </p>
      <p>If you did not request this OTP, please ignore this message.</p>
      <div style="margin-top: 20px; font-size: 12px; color: #777;">
        <p>
          Best regards,<br />
          <strong>Managing Passwords with ZPM</strong>
        </p>
      </div>
    </div>

    `;
  }

  async sendEmail() {
    try {
      await this.transporter.sendMail(this.getOptions()); // Await the sendMail promise
    } catch (err) {
      Logger.logMessage(
        new Log(
          LoggerConstants.STATUS.FAILED,
          MessageHandler.getErrorMessage(LoggerConstants.MESSAGE_TYPES.INTERNET)
        )
      );
      process.exit();
    }
  }
}

module.exports = { Email };
