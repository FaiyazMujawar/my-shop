import { z } from 'zod';

export const ResponseInputSchema = z.enum(['text', 'number', 'date', 'file']);

export const QuestionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, { message: 'Question must be provided' }),
  type: ResponseInputSchema,
  required: z.boolean(),
});

export const CreateServiceSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  description: z.string(),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(1, { message: 'Price must be greater than 0' }),
  type: z.enum(['ONLINE', 'OFFLINE']).optional(),
  questions: z.array(QuestionSchema),
});
