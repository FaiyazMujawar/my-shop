import {
  media,
  orders,
  questions,
  services,
  userResponses,
  users,
} from '~/db/schema';

export type IUserResponse = typeof userResponses.$inferSelect & {
  question: typeof questions.$inferSelect;
  media: typeof media.$inferSelect | null;
};

export type IOrder = typeof orders.$inferSelect & {
  service: typeof services.$inferSelect;
  userResponses: IUserResponse[];
  user: typeof users.$inferSelect;
  result: typeof media.$inferSelect | null;
};

export type OrderResponse = {
  id: string;
  status: 'pending' | 'cancelled' | 'accepted' | 'rejected' | 'completed';
  service?: {
    id: string;
    title: string;
    price: number;
  } | null;
  userResponses: Array<{
    id: string;
    question: string;
    answer: string | null;
    media: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  user?: {
    name: string;
    email: string;
  } | null;
  note: string | null;
  result?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrderRequest = {
  serviceId: string;
  userResponses: Record<string, string>;
};

export type IMedia = typeof media.$inferSelect;
