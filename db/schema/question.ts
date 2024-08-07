import { boolean, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { services } from './service';
import { relations } from 'drizzle-orm';

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

export const questionRelations = relations(questions, ({ one }) => {
  return {
    service: one(services, {
      fields: [questions.serviceId],
      references: [services.id],
    }),
  };
});
