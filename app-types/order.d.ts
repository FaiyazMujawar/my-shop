import { orders, users, services, answers } from '~/db/schema';
import { AddQuestion, IService } from '~/types/service';

export type QuestionResponse = {
  id?: string;
  question: AddQuestion;
  type: string;
  answer: string;
  url: string;
};

export type IAnswer = typeof answers.$inferSelect;

export type IOrder = typeof orders.$inferSelect & {
  user: typeof users.$inferSelect;
  service: typeof services.$inferSelect;
  answers: IAnswer[];
};
