import { eq } from "drizzle-orm"
import { db } from "../conn.js"
import { theatersTable } from "../db/theaters.js"

export const createTheaterRepository = async (data: {
  name: string
  city: string
  address: string
}) => {
  const [theater] = await db
    .insert(theatersTable)
    .values({
      name: data.name,
      city: data.city,
      address: data.address,
    })
    .returning()

  return theater
}

export const findTheaterById = async (id: string) => {
  const [theater] = await db
    .select()
    .from(theatersTable)
    .where(eq(theatersTable.id, id))

  return theater ?? null
}

export const findTheatersByCity = async (city: string) => {
  return await db
    .select()
    .from(theatersTable)
    .where(eq(theatersTable.city, city))
}
