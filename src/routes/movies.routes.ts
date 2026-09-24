import { Router } from "express"
import { authenticateJWT, requireAdmin } from "../middleware/auth.middleware.js"
import { createMovie, getMovieController } from "../controllers/movie.controller.js"

const router = Router()

router.post("/movies", authenticateJWT, requireAdmin, createMovie)
router.get("/movies", authenticateJWT, getMovieController);
export default router
