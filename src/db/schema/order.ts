import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './auth';
import { services } from './service';
import { userResponses } from './user-response';

export const orderStatus = pgEnum('order_status', [
  'pending',
  'accepted',
  'rejected',
  'completed',
]);

export const orders = pgTable('orders', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  serviceId: uuid('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: orderStatus('status').notNull().default('pending'),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
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
    userResponses: many(userResponses),
  };
});
