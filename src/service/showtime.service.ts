import {
  createShowtimeRepository,
  findShowtimesByScreen,
} from "../repositories/showtime.repository.js";

import { findMovieById } from "../repositories/movie.repository.js";
import { findScreenById } from "../repositories/screen.repository.js";
import { AppError } from "../utils/AppError.js";

export const createShowtimes = async (data: {
  movie_id: string;
  screen_id: string;
  start_time: Date;
  end_time: Date;
  base_price: number;
}) => {
  const movie = await findMovieById(data.movie_id);

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  const screen = await findScreenById(data.screen_id);

  if (!screen) {
    throw new AppError("Screen not found", 404);
  }

  if (data.end_time <= data.start_time) {
    throw new AppError(
      "End time must be after start time",
      400
    );
  }

  if (data.base_price <= 0) {
    throw new AppError(
      "Base price must be greater than 0",
      400
    );
  }

  /*
   * Later we should add an overlap check here:
   *
   * Screen A:
   * 10:00 - 12:00
   *
   * New show:
   * 11:00 - 13:00
   *
   * ❌ Cannot allow this.
   */

  return await createShowtimeRepository(data);
};

export const getShowtimesByScreen = async (screenId: string) => {
  const screen = await findScreenById(screenId);

  if (!screen) {
    throw new AppError("Screen not found", 404);
  }

  return await findShowtimesByScreen(screenId);
};