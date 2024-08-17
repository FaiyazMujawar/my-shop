import { services } from '~/db/schema/service';

export type IService = typeof services.$inferSelect;
