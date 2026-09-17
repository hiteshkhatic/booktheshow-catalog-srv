import { and, eq } from "drizzle-orm"
import { db } from "../conn.js"
import { screensTable } from "../db/screens.js"

export const createScreenRepository = async (data: {
  theater_id: string
  name: string
  seat_layout: unknown
}) => {
  const [screen] = await db
    .insert(screensTable)
    .values({
      theater_id: data.theater_id,
      name: data.name,
      seat_layout: data.seat_layout,
    })
    .returning()

  return screen
}

export const findScreenById = async (id: string) => {
  const [screen] = await db
    .select()
    .from(screensTable)
    .where(eq(screensTable.id, id))

  return screen ?? null
}

export const findScreensByTheaterId = async (theaterId: string) => {
  return await db
    .select()
    .from(screensTable)
    .where(eq(screensTable.theater_id, theaterId))
}

export const findScreenByTheaterAndName = async (
  theaterId: string,
  name: string,
) => {
  const [screen] = await db
    .select()
    .from(screensTable)
    .where(
      and(eq(screensTable.theater_id, theaterId), eq(screensTable.name, name)),
    )

  return screen ?? null
}
