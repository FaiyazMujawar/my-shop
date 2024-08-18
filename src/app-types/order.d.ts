import { media, orders, services, userResponses } from '~/db/schema';

export type IUserResponse = typeof userResponses.$inferSelect;

export type IOrder = typeof orders.$inferSelect & {
  service: typeof services.$inferSelect;
  userResponses: IUserResponse[];
};

export type OrderRequest = {
  serviceId: string;
  userResponses: Record<string, any>;
};

export type IMedia = typeof media.$inferSelect;
