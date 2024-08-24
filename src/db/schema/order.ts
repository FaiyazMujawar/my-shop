import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './auth';
import { media } from './media';
import { services } from './service';
import { userResponses } from './user-response';

export const orderStatus = pgEnum('order_status', [
  'pending',
  'cancelled',
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
  completedAt: timestamp('completed_at', { mode: 'string' }),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  result: uuid('result').references(() => media.id),
  note: text('note'),
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
    result: one(media, {
      fields: [orders.result],
      references: [media.id],
    }),
  };
});
