import { answers, orders, services, users } from '~/db/schema';
import { AddQuestion, IQuestion } from '~/types/service';

export type QuestionResponse = {
  id?: string;
  question: AddQuestion;
  type: string;
  answer: string;
  url: string;
};

export type IAnswer = typeof answers.$inferSelect & {
  question: !IQuestion;
};

export type IOrder = typeof orders.$inferSelect & {
  user: typeof users.$inferSelect;
  service: typeof services.$inferSelect;
  answers: IAnswer[];
};
