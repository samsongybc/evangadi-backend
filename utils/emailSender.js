// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();

// const sendEmail = async (to, subject, html) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Forum App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("Email sent:", info.messageId);
//     return info;
//   } catch (err) {
//     console.error("Error sending email:", err);
//     throw err;
//   }
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

// Only load .env in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Forum App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
```

---

## **Also: Add Email Variables to Railway**

If your app uses email functionality, you need to add these to Railway → Variables:
```;
const nodemailer = require("nodemailer");

// Only load .env in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Forum App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
// ```

// ---

// ## **Also: Add Email Variables to Railway**

// If your app uses email functionality, you need to add these to Railway → Variables:
// ```;
// EMAIL_USER=your-gmail@gmail.com
// EMAIL_PASS=your-app-specific-password
