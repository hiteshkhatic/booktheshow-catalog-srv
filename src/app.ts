import express from "express";
import cookieParser from "cookie-parser";

import moviesRoutes from "./routes/movies.routes.js";
import screensRoutes from "./routes/screens.routes.js";
import showtimesRoutes from "./routes/showtimes.routes.js";
import theatersRoutes from "./routes/theaters.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/catalog", moviesRoutes);
app.use("/api/catalog", screensRoutes);
app.use("/api/catalog", showtimesRoutes);
app.use("/api/catalog", theatersRoutes);

export default app;