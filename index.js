import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { VERIFICATION_EMAIL_TEMPLATE } from "./email/emailTemplates.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));
app.use(express.json());

// Path to React build folder
const reactBuildPath = path.join(__dirname, "react-page/build");

// Serve the React app's build folder for any request to /react-page
app.use("/react-page", express.static(reactBuildPath));

// Serve the React page's index.html for any unmatched route within /react-page
app.get("/react-page/*", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

// Mailtrap client setup
const client = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });

const sender = {
  email: "hello@demomailtrap.com",
  name: "Verification Email",
};

// Serve the email HTML form
app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "email/email.html"));
});

// Endpoint to send the verification email
app.post("/send-verification-email", async (req, res) => {
  const { email, verificationToken } = req.body;

  try {
    const response = await client.send({
      from: sender,
      to: [{ email }],
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Integration Test",
    });

    console.log("Email sent successfully:", response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/verify-email", (req, res) => {
  const token = req.query.token;

  if (token === "e5f39fe7596c") {
    let cookie = JSON.parse(req.cookies.user);
    cookie.verified = true;
    res.cookie("user", JSON.stringify(cookie), {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).send("Email Verified Successfully");
  } else {
    return res.status(500).send("Wrong Token!");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
