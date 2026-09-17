import { pgTable, uuid, text, timestamp, date, integer, index} from 'drizzle-orm/pg-core';
import { moviesTable } from './movies.js';
import { screensTable } from './screens.js';

export const showtimesTable = pgTable("showtimes", {
    id: uuid().primaryKey().defaultRandom(),
    movie_id: uuid().notNull().references(() => moviesTable.id), 
    screen_id: uuid().notNull().references(() => screensTable.id), 
    start_time: timestamp().notNull(),
    end_time: timestamp().notNull(),
    base_price: integer().notNull(),
},
(table) => ({
    movieStartIdx: index('showtimes_movie_start_idx').on(
        table.movie_id,
        table.start_time
    ),

    screenStartIdx: index("showtimes_screen_start_idx").on(
        table.screen_id,
        table.start_time
    )
}));