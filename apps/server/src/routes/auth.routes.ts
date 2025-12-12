import { formatError, handlePrismaError } from "@/helpers";
import { signUpSchema } from "@/validators/auth";
import prisma from "@clash-app/db";
import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.post("/sign-up", async (req: Request, res: Response) => {
  const parsed = signUpSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(formatError(parsed.error));
  }

  const { name, email, password } = parsed.data;

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
      select: {
        name: true,
        email: true,
        created_at: true,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
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
