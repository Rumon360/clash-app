import { Router } from "express";
import AuthRoutes from "./auth.routes";
import VerifyRoutes from "./verify.routes";

const router = Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/verify", VerifyRoutes);

export default router;
