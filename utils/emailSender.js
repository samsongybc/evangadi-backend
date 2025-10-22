const sgMail = require("@sendgrid/mail");

// Only load .env in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sendEmail = async (to, subject, html) => {
  try {
    // Check for SendGrid API key first (for production)
    if (process.env.SENDGRID_API_KEY) {
      console.log("Using SendGrid for email...");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: to,
        from: process.env.EMAIL_USER || "noreply@evangadi-forum.com",
        subject: subject,
        html: html,
      };

      const result = await sgMail.send(msg);
      console.log("✅ Email sent via SendGrid");
      return result;
    }

    // Fallback to Gmail for local development
    const nodemailer = require("nodemailer");

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error(
        "Email credentials not configured. Please set SENDGRID_API_KEY or EMAIL_USER and EMAIL_PASS."
      );
    }

    console.log("Using Gmail for email...");
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
      from: `"Evangadi Forum" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent via Gmail");
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    throw err;
  }
};

module.exports = sendEmail;
