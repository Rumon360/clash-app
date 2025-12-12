import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { emailQueue, EmailQueueName } from "./jobs/email.job";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.get("/welcome", (_req, res) => {
  res.render("welcome");
});

app.get("/welcome-email", async (_req, res) => {
  try {
    const html = await ejs.renderFile(__dirname + "/views/emails/welcome.ejs", {
      name: "Rumon",
      href: process.env.FRONTEND_URL,
    });
    await emailQueue.add(EmailQueueName, {
      to: "yoniyir695@alexida.com",
      subject: "Welcome to Clash App",
      html: html,
    });
    return res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
