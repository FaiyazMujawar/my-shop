import { db } from '@config/db';
import { users } from '@config/db/schema/auth';
import { eq } from 'drizzle-orm';

export async function getUserById(uid: string) {
  const usersInDb = await db
    .selectDistinct()
    .from(users)
    .where(eq(users.id, uid));
  if (usersInDb.length == 0) return undefined;
  return usersInDb[0];
}
