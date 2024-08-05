import { relations } from 'drizzle-orm';
import { users } from './auth';
import { orders, responses } from './order';
import { questions, services } from './service';

export const serviceRelations = relations(services, ({ many }) => {
  return {
    questions: many(questions),
    order: many(orders),
  };
});

export const questionRelations = relations(questions, ({ one }) => {
  return {
    service: one(services, {
      fields: [questions.serviceId],
      references: [services.id],
    }),
    responses: one(responses),
  };
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
    responses: many(responses),
  };
});

export const responseRelations = relations(responses, ({ one, many }) => {
  return {
    question: one(questions, {
      fields: [responses.questionId],
      references: [questions.id],
    }),
    order: one(orders, {
      fields: [responses.orderId],
      references: [orders.id],
    }),
  };
});
