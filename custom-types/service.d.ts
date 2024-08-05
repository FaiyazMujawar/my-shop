import {
  CreateServiceSchema,
  QuestionSchema,
  ResponseInputSchema,
} from '@utils/validations/schema';
import { z } from 'zod';

export type ResponseInputType = z.infer<typeof ResponseInputSchema>;

export type Question = z.infer<typeof QuestionSchema>;

export type Service = z.infer<typeof CreateServiceSchema>;
