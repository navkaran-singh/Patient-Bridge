import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

const recipients = [
  {
    email: "navkaransinghbakshi04@gmail.com", // Replace with a valid email
  },
];

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "You are awesome!",
      text: `Congrats for sending test email with Mailtrap! Token: ${verificationToken}`,
      category: "Integration Test",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};