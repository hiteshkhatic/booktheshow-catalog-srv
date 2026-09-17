import type { Request, Response, NextFunction } from "express";
import { createShowtimes, getShowtimesByScreen } from "../service/showtime.service.js";
export const createShowtime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      movie_id,
      screen_id,
      start_time,
      end_time,
      base_price,
    } = req.body;

    // Later:
    const showtime = await createShowtimes(req.body);

    return res.status(201).json({
      message: "Showtime created successfully",
      data: {
        movie_id,
        screen_id,
        start_time,
        end_time,
        base_price,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getMovieShowtimes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { city, date } = req.query;

    // Later:
    const showtimes =
      await getShowtimesByScreen(id as string);

    return res.status(200).json({
      message: "Showtimes fetched successfully",
      movie_id: id,
      city,
      date,
    });
  } catch (error) {
    next(error);
  }
};