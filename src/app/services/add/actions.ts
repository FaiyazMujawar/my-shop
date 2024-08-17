'use server';

import { AddService } from '~/app-types/service';
import { db } from '~/db';
import { services } from '~/db/schema';
import { questions } from '~/db/schema/question';

export async function addService(
  request: AddService
): Promise<{ success: boolean; error?: string }> {
  try {
    const service = await db.insert(services).values(request).returning();

    await db
      .insert(questions)
      .values(
        request.questions.map((q) => ({ ...q, serviceId: service[0].id }))
      );

    return { success: true, error: undefined };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
