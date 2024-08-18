import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { media } from './media';
import { orders } from './order';

export const userResponses = pgTable('user_responses', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id),
  answer: text('answer'),
  media: uuid('media').references(() => media.id),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const userResponseRelations = relations(userResponses, ({ one }) => {
  return {
    media: one(media, {
      fields: [userResponses.media],
      references: [media.id],
    }),
    order: one(orders, {
      fields: [userResponses.orderId],
      references: [orders.id],
    }),
  };
});
