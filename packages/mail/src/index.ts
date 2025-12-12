import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer, { type Transporter } from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const TOKEN = process.env.MAILTRAP_TOKEN!;
const INBOX_ID = Number(process.env.MAILTRAP_INBOX_ID);

export const transporter: Transporter = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    sandbox: true,
    testInboxId: INBOX_ID,
  })
);

export const sendMail = async (to: string, subject: string, body: string) => {
  const sender = {
    address: "hello@example.com",
    name: "Mailtrap Test",
  };

  await transporter.sendMail({
    from: sender,
    to: to,
    subject: subject,
    html: body,
  });
};
