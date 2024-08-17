import { z } from 'zod';

export const AddQuestionSchema = z.object({
  question: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  type: z.enum(['text', 'number', 'date', 'file']),
  required: z.boolean(),
});

export const AddServiceSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(300, { message: 'Description must be less than 1000 characters' }),
  price: z.coerce
    .number({ invalid_type_error: 'Price is required' })
    .positive({ message: 'Price must be greater than 0' }),
  type: z.enum(['online', 'offline']),
  questions: z.array(AddQuestionSchema),
});
