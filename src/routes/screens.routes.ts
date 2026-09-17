import { Router } from "express";
import {
  authenticateJWT,
  requireAdmin,
} from "../middleware/auth.middleware.js";
import { createScreen } from "../controllers/screen.controller.js";

const router = Router();

router.post(
  "/screens",
  authenticateJWT,
  requireAdmin,
  createScreen
);

export default router;