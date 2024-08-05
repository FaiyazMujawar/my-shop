import {
  boolean,
  pgEnum,
  pgTable,
  real,
  text,
  uuid,
} from 'drizzle-orm/pg-core';

// Services table

export const serviceType = pgEnum('SERVICE_TYPE', ['ONLINE', 'OFFLINE']);

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  type: serviceType('type').notNull().default('ONLINE'),
});

// Questions table

export const questionType = pgEnum('QUESTION_TYPE', [
  'text',
  'number',
  'date',
  'file',
]);

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  text: text('text').notNull(),
  required: boolean('required').notNull().default(false),
  type: questionType('type').notNull().default('text'),
  serviceId: uuid('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),
});
