'use server';

import { eq } from 'drizzle-orm';
import { AddService } from '~/app-types/service';
import { db } from '~/db';
import { questions, services } from '~/db/schema';

export async function updateServiceAction(id: string, request: AddService) {
  await db.update(services).set(request).where(eq(services.id, id));
  await db.delete(questions).where(eq(questions.serviceId, id));
  await db
    .insert(questions)
    .values(request.questions.map((q) => ({ ...q, serviceId: id })));
}
