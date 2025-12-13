import prisma from "@clash-app/db";
import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/email", async (req: Request, res: Response) => {
  const { email, token } = req.query;

  if (email && token) {
    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (user) {
      if (token === user.email_verify_token) {
        await prisma.user.update({
          data: {
            email_verify_token: null,
            email_verified_at: new Date().toISOString(),
          },
          where: {
            email: email as string,
          },
        });

        return res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
      }
    }
    return res
      .status(400)
      .json({ error: { code: "INVALID_REQUEST", message: "Invalid Request" } });
  }
  return res
    .status(400)
    .json({ error: { code: "INVALID_REQUEST", message: "Invalid Request" } });
});

export default router;
