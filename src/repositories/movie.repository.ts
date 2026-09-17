import { and, eq, ilike } from "drizzle-orm"
import { db } from "../conn.js"
import { moviesTable } from "../db/index.js"
type NewMovie = typeof moviesTable.$inferInsert

export const createMovieRepository = async (data: NewMovie) => {
  const [movie] = await db.insert(moviesTable).values(data).returning()

  return movie
}

export const findMovieById = async (id: string) => {
  const [movie] = await db
    .select()
    .from(moviesTable)
    .where(eq(moviesTable.id, id))

  return movie ?? null
}

export const findMovieByTitle = async (title: string) => {
  const [movie] = await db
    .select()
    .from(moviesTable)
    .where(eq(moviesTable.title, title))

  return movie ?? null
}

export const searchMovies = async (filters: {
  language?: string
  genre?: string
}) => {
  const conditions = []

  if (filters.language) {
    conditions.push(eq(moviesTable.language, filters.language))
  }

  if (filters.genre) {
    conditions.push(eq(moviesTable.genre, filters.genre as any))
  }

  return await db
    .select()
    .from(moviesTable)
    .where(conditions.length ? and(...conditions) : undefined)
}
