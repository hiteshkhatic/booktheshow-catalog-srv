import type { Request, Response, NextFunction } from "express";
import { createScreens } from "../service/screen.service.js";

export const createScreen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { theater_id, name, seat_layout } = req.body;

    // Later:
    const screen = await createScreens({
      theater_id,
      name,
      seat_layout,
    });

    return res.status(201).json({
      message: "Screen created successfully",
      data: {
        theater_id,
        name,
        seat_layout,
      },
    });
  } catch (error) {
    next(error);
  }
};