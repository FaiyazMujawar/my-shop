import { questions, services } from '@config/db/schema/service';
import { relations } from 'drizzle-orm';

export const serviceRelations = relations(services, ({ many }) => {
  return {
    questions: many(questions),
  };
});

export const questionRelations = relations(questions, ({ one }) => {
  return {
    questions: one(services, {
      fields: [questions.serviceId],
      references: [services.id],
    }),
  };
});
