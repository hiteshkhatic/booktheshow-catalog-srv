import {
  createScreenRepository,
  findScreenByTheaterAndName,
  findScreensByTheaterId,
} from "../repositories/screen.repository.js"

import { findTheaterById } from "../repositories/theater.repository.js"
import { AppError } from "../utils/AppError.js"

export const createScreens = async (data: {
  theater_id: string
  name: string
  seat_layout: unknown
}) => {
  const theater = await findTheaterById(data.theater_id)

  if (!theater) {
    throw new AppError("Theater not found", 404)
  }

  const existingScreen = await findScreenByTheaterAndName(
    data.theater_id,
    data.name,
  )

  if (existingScreen) {
    throw new AppError(
      "Screen with this name already exists in this theater",
      409,
    )
  }

  return await createScreenRepository(data)
}

export const getTheaterScreens = async (theaterId: string) => {
  const theater = await findTheaterById(theaterId)

  if (!theater) {
    throw new AppError("Theater not found", 404)
  }

  return await findScreensByTheaterId(theaterId)
}
