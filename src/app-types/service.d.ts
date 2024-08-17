import { z } from 'zod';
import { questions } from '~/db/schema/question';
import { services } from '~/db/schema/service';
import {
  AddQuestionSchema,
  AddServiceSchema,
} from '~/utils/validation/schema/service';

export type IService = typeof services.$inferSelect & {
  questions: IQuestion[];
};

export type IQuestion = typeof questions.$inferSelect;

export type AddQuestion = z.infer<typeof AddQuestionSchema>;

export type AddService = z.infer<typeof AddServiceSchema> & {
  questions: AddQuestion[];
};
