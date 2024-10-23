import { MailtrapClient } from "mailtrap"; // provides the functionality to send emails through Mailtrap's email delivery API.
import dotenv from "dotenv";

dotenv.config();

// creates a new MailtrapClient object, which is used to interact with the Mailtrap API for sending emails
export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN, // token ensures that only authorized users can send emails
});

// defines a default sender's email and name, which will be used when sending emails.
export const sender = {
  email: "admin@patient-bridge.com",
  name: "Mr X",
};