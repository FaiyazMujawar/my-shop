import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const media = pgTable('media', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  objectKey: varchar('object_key', { length: 255 }).notNull(),
  contentType: varchar('content_type', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
  toDelete: boolean('to_delete').notNull().default(false),
});
