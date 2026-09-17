import { pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core';

export const theatersTable = pgTable("theaters", {
    id: uuid().primaryKey().defaultRandom(), 
    name: text().notNull(),
    city: text().notNull(),
    address: text().notNull(), 
    created_at: timestamp().defaultNow().notNull(),
});