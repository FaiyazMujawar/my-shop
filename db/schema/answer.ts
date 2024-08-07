import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { orders } from './order';
import { questions, questionType } from './question';
import { relations } from 'drizzle-orm';

export const answers = pgTable('answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  questionId: uuid('question_id').references(() => questions.id, {
    onDelete: 'cascade',
  }),
  type: questionType('type').notNull().default('text'),
  answer: text('text'),
  objectKey: text('object_key'),
  filename: text('filename'),
});

export const answerRelations = relations(answers, ({ one }) => {
  return {
    order: one(orders, {
      fields: [answers.orderId],
      references: [orders.id],
    }),
    question: one(questions, {
      fields: [answers.questionId],
      references: [questions.id],
    }),
  };
});
