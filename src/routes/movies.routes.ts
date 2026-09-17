import { Router } from "express"
import { authenticateJWT, requireAdmin } from "../middleware/auth.middleware.js"
import { createMovie } from "../controllers/movie.controller.js"

const router = Router()

router.post("/movies", authenticateJWT, requireAdmin, createMovie)
router.get("/movies", getMovies);
export default router
