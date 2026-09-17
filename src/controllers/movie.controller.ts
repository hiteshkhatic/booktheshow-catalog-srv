import type { Request, Response, NextFunction } from "express"
import { createMovies, getMovies } from "../service/movie.service.js";
export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      description,
      duration_minutes,
      language,
      genre,
      release_date,
      poster_url,
    } = req.body

    // Later:
    const movie = await createMovies(req.body);

    return res.status(201).json({
      message: "Movie created successfully",
      data: {
        title,
        description,
        duration_minutes,
        language,
        genre,
        release_date,
        poster_url,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await getMovies({
      ...(typeof req.query.city === "string" && { city: req.query.city }),
      ...(typeof req.query.language === "string" && {
        language: req.query.language,
      }),
      ...(typeof req.query.genre === "string" && { genre: req.query.genre }),
      ...(typeof req.query.date === "string" && { date: req.query.date }),
    });

    return res.status(200).json({
      movies,
    });
  } catch (error) {
    next(error);
  }
};