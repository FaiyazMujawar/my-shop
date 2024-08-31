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
};

export type OrderRequest = {
  serviceId: string;
  userResponses: Record<string, string>;
};

export type IMedia = typeof media.$inferSelect;
