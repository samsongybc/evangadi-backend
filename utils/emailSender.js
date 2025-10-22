const nodemailer = require("nodemailer");

// Only load .env in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error(
        "Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS in your environment variables."
      );
    }

    // Remove any spaces from password
    const cleanPassword = process.env.EMAIL_PASS.replace(/\s+/g, "");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPassword,
      },
    });

    const info = await transporter.sendMail({
      from: `"Forum App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
