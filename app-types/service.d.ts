import { z } from 'zod';
import { questions, services } from '~/db/schema';
import {
  AddQuestionSchema,
  AddServiceSchema,
  ResponseInputSchema,
} from '~/utils/validations/schema';

export type ResponseInputType = z.infer<typeof ResponseInputSchema>;

export type AddQuestion = z.infer<typeof AddQuestionSchema>;

export type AddService = z.infer<typeof AddServiceSchema>;

export type IQuestion = typeof questions.$inferSelect;

export type IService = typeof services.$inferSelect & {
  questions: IQuestion[];
};
