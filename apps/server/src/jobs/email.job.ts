import { defaultJobOptions, redisConnection } from "@clash-app/db/queue";
import { sendMail } from "@clash-app/mail";
import { Queue, Job, Worker } from "bullmq";

export const EmailQueueName = "email-queue";

interface EmailJobDataType {
  to: string;
  subject: string;
  html: string;
}

export const emailQueue = new Queue(EmailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultJobOptions,
});

export const queueWorker = new Worker(
  EmailQueueName,
  async (job: Job) => {
    const data: EmailJobDataType = job.data;
    await sendMail(data.to, data.subject, data.html);
  },
  { connection: redisConnection }
);
