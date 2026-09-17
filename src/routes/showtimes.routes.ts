import { Router } from "express"
import { authenticateJWT, requireAdmin } from "../middleware/auth.middleware.js"
import { createShowtime } from "../controllers/showtime.controller.js";

const router = Router()

router.post(
  "/showtimes",
  authenticateJWT,
  requireAdmin,
  createShowtime
);

export default router
