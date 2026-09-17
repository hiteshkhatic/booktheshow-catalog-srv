import { pgTable, uuid, text, timestamp, integer, pgEnum, date} from 'drizzle-orm/pg-core';

export const genreEnum = pgEnum('genre', ['sci-fi','horror','romantic']);

export const moviesTable = pgTable("movies", {
    id: uuid().primaryKey().defaultRandom(), 
    title: text().notNull(),
    description: text().notNull(),
    duration_minutes: integer().notNull(), 
    language: text().notNull(),
    genre: genreEnum().notNull(),
    release_date: date().notNull(),
    poster_url: text().notNull(),
});