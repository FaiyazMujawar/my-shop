import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uuid, real, text } from 'drizzle-orm/pg-core';
import { questions } from './question';

export const serviceType = pgEnum('SERVICE_TYPE', ['ONLINE', 'OFFLINE']);

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  type: serviceType('type').notNull().default('ONLINE'),
});

export const serviceRelations = relations(services, ({ many }) => {
  return {
    questions: many(questions),
  };
});
