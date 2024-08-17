import { db } from '..';
import { services } from '../schema';

export async function getAllServices() {
  return await db.select().from(services);
}
