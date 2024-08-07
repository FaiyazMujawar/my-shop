import { orders, questions, services } from '~/db/schema';
import {
  AddServiceSchema,
  AddQuestionSchema,
  ResponseInputSchema,
} from '~/utils/validations/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';

export type ResponseInputType = z.infer<typeof ResponseInputSchema>;

export type AddQuestion = z.infer<typeof AddQuestionSchema>;

export type AddService = z.infer<typeof AddServiceSchema>;

export type IQuestion = typeof questions.$inferSelect;

export type IService = typeof services.$inferSelect & {
  questions: IQuestion[];
};
