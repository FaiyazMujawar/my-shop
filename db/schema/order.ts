import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './auth';
import { services } from './service';
import { relations } from 'drizzle-orm';
import { answers } from './answer';

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
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date().toISOString()),
  completedAt: timestamp('completed_at'),
});

export const orderRelations = relations(orders, ({ one, many }) => {
  return {
    service: one(services, {
      fields: [orders.serviceId],
      references: [services.id],
    }),
    user: one(users, {
      fields: [orders.userId],
      references: [users.id],
    }),
    answers: many(answers),
  };
});
