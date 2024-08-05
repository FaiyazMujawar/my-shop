import { Question } from '@custom-types/service';

export type QuestionResponse = {
  id?: string;
  question: Question;
  type: string;
  answer: string;
  url: string;
};

export type Order = {
  id?: string;
  serviceId: string;
  userId: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date;
  responses: QuestionResponse[];
};
