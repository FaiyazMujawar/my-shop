import { eq } from 'drizzle-orm';
import { IService } from '~/app-types/service';
import { db } from '..';
import { services } from '../schema/service';

export async function getAllServices(): Promise<IService[]> {
  return await db.query.services.findMany({ with: { questions: true } });
}

export async function getServiceById(
  id: string
): Promise<IService | undefined> {
  return await db.query.services.findFirst({
    where: eq(services.id, id),
    with: { questions: true },
  });
}

export async function deleteService(id: string) {
  await db.delete(services).where(eq(services.id, id));
}
