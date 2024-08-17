import { relations } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { questions } from './question';

export const serviceType = pgEnum('service_type', ['online', 'offline']);

export const services = pgTable('services', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 255 }),
  price: real('price').notNull(),
  type: serviceType('type').notNull().default('online'),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const serviceRelations = relations(services, ({ many }) => {
  return {
    questions: many(questions),
  };
});
