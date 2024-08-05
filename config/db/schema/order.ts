// import { questions, services, users } from '@config/db/schema';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './auth';
import { questions, questionType, services } from './service';

export const orderStatus = pgEnum('ORDER_STATUS', ['PENDING', 'COMPLETED']);

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  serviceId: uuid('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),
  status: orderStatus('status').default('PENDING'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const responses = pgTable('responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  questionId: uuid('question_id').references(() => questions.id, {
    onDelete: 'cascade',
  }),
  type: questionType('type').notNull().default('text'),
  response: text('text'),
  url: text('url'),
});
