import { Router } from "express";
import {
  authenticateJWT,
  requireAdmin,
} from "../middleware/auth.middleware.js";
import { createTheater } from "../controllers/theater.controller.js";

const router = Router();

router.post(
  "/theaters",
  authenticateJWT,
  requireAdmin,
  createTheater
);

export default router;