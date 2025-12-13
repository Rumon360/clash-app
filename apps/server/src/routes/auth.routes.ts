import { formatError, handlePrismaError, renderMailEjs } from "@/helpers";
import { signUpSchema } from "@/validators/auth";
import prisma from "@clash-app/db";
import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, EmailQueueName } from "@/jobs/email.job";

const router = Router();

router.post("/sign-up", async (req: Request, res: Response) => {
  const parsed = signUpSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(formatError(parsed.error));
  }

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return res.status(409).json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid Credentials",
        },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create verification token
    const token = await bcrypt.hash(uuid4(), salt);
    const url = `${process.env.BACKEND_URL}/api/verify/email?email=${email}&token=${token}`;

    // Render email
    const html = await renderMailEjs("account-verify", {
      name,
      href: url,
    });

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        email_verify_token: token,
      },
      select: {
        name: true,
        email: true,
        created_at: true,
      },
    });

    //  Send email AFTER successful creation
    await emailQueue.add(EmailQueueName, {
      to: email,
      subject: "Verify your email address",
      html,
    });

    return res.status(201).json({
      message: "Please check your email to verify your account.",
      data: user,
    });
  } catch (err) {
    const error = handlePrismaError(err, { hideForAuth: true });

    if (error.status !== 500) {
      return res.status(error.status).json({ error: error.error });
    }

    console.error("Signup error:", err);

    return res.status(500).json({
      error: { code: "INTERNAL_SERVER_ERROR", message: "Invalid Credentials" },
    });
  }
});

export default router;
