import { and, eq, gte, lt } from "drizzle-orm"
import { db } from "../conn.js"
import { showtimesTable } from "../db/showtimes.js"

type NewShowtime = typeof showtimesTable.$inferInsert

export const createShowtimeRepository = async (data: NewShowtime) => {
  const [showtime] = await db.insert(showtimesTable).values(data).returning()

  return showtime
}

export const findShowtimeById = async (id: string) => {
  const [showtime] = await db
    .select()
    .from(showtimesTable)
    .where(eq(showtimesTable.id, id))

  return showtime ?? null
}

export const findShowtimesByScreen = async (screenId: string) => {
  return await db
    .select()
    .from(showtimesTable)
    .where(eq(showtimesTable.screen_id, screenId))
}

export const findShowtimesByMovieAndDate = async (
  movieId: string,
  startOfDay: Date,
  endOfDay: Date,
) => {
  return await db
    .select()
    .from(showtimesTable)
    .where(
      and(
        eq(showtimesTable.movie_id, movieId),
        gte(showtimesTable.start_time, startOfDay),
        lt(showtimesTable.start_time, endOfDay),
      ),
    )
}
