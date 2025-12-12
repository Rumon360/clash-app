import { Router } from "express";
import AuthRoutes from "./auth.routes";

const router = Router();

router.use("/api/auth", AuthRoutes);

export default router;
