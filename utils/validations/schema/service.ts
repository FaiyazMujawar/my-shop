import { z } from 'zod';

export const ResponseInputSchema = z.enum(['text', 'number', 'date', 'file']);

export const AddQuestionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, { message: 'Question must be provided' }),
  type: ResponseInputSchema,
  required: z.boolean(),
});

export const AddServiceSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  description: z.string(),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(1, { message: 'Price must be greater than 0' }),
  type: z.enum(['ONLINE', 'OFFLINE']).optional(),
  questions: z.array(AddQuestionSchema),
});
