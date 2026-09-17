import { pgTable, uuid, text, timestamp, jsonb, unique} from 'drizzle-orm/pg-core';
import { theatersTable } from './theaters.js';

export const screensTable = pgTable("screens", {
    id: uuid().primaryKey().defaultRandom(), 
    theater_id: uuid().references(() => theatersTable.id),
    name: text().notNull(),
    seat_layout: jsonb().notNull(),
}, 
(table) => ({
    theaterScrenNameUnique: unique().on(
        table.theater_id,
        table.name
    )
}));