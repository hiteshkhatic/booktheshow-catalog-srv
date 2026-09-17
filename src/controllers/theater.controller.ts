import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  createTheater as createTheaterService,
} from "../service/theater.service.js";

export const createTheater = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const theater = await createTheaterService(req.body);

    return res.status(201).json({
      message: "Theater created successfully",
      theater,
    });
  } catch (error) {
    next(error);
  }
};