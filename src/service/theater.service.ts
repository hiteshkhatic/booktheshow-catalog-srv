import {
  createTheaterRepository,
  findTheaterById,
} from "../repositories/theater.repository.js";
import { AppError } from "../utils/AppError.js";

export const createTheater = async (data: {
  name: string;
  city: string;
  address: string;
}) => {
  if (!data.name || !data.city || !data.address) {
    throw new AppError("Name, city and address are required", 400);
  }

  return await createTheaterRepository(data);
};

export const getTheaterById = async (id: string) => {
  const theater = await findTheaterById(id);

  if (!theater) {
    throw new AppError("Theater not found", 404);
  }

  return theater;
};