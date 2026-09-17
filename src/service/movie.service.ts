import {
  createMovieRepository,
  findMovieById,
  findMovieByTitle,
  searchMovies,
} from "../repositories/movie.repository.js"
import { genreEnum } from "../db/movies.js"
import { moviesTable } from "../db/movies.js"
import { AppError } from "../utils/AppError.js"

type NewMovie = typeof moviesTable.$inferInsert
export const createMovies = async (data: NewMovie) => {
  const existingMovie = await findMovieByTitle(data.title);

  if (existingMovie) {
    throw new AppError("Movie already exists", 409);
  }

  if (data.duration_minutes <= 0) {
    throw new AppError(
      "Movie duration must be greater than 0",
      400
    );
  }

  return await createMovieRepository(data);
};

export const getMovies = async (filters: {
  city?: string;
  language?: string;
  genre?: string;
  date?: string;
}) => {
  return await searchMovies(filters);
};