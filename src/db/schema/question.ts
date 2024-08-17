import { relations } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { services } from './service';

export const questionType = pgEnum('question_type', [
  'text',
  'number',
  'date',
  'file',
]);

export const questions = pgTable('questions', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  question: text('title').notNull(),
  type: questionType('type').notNull().default('text'),
  required: boolean('required').notNull().default(false),
  serviceId: uuid('serviceId').references(() => services.id, {
    onDelete: 'cascade',
  }),
});

export const questionRelations = relations(questions, ({ one }) => {
  return {
    service: one(services, {
      fields: [questions.serviceId],
      references: [services.id],
    }),
  };
});
