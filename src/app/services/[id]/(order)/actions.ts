'use server';

import { eq, inArray } from 'drizzle-orm';
import { OrderRequest } from '~/app-types/order';
import { auth } from '~/config/auth';
import { db } from '~/db';
import { media, orders, services, userResponses } from '~/db/schema';

export async function placeOrder(request: OrderRequest) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: 'Please login to place order' };
  }
  const service = await db.query.services.findFirst({
    where: eq(services.id, request.serviceId),
    with: { questions: true },
  });
  const order = await db
    .insert(orders)
    .values({
      serviceId: request.serviceId,
      userId: session.user?.id!,
    })
    .returning({ id: orders.id });
  const mediaIds: string[] = [];
  const responses = service?.questions.map((question) => {
    if (question.type === 'file') {
      mediaIds.push(request.userResponses[question.id]);
    }
    const response = {
      orderId: order[0].id,
      questionId: question.id,
      answer:
        question.type !== 'file'
          ? request.userResponses[question.id].toString()
          : null,
      media:
        question.type === 'file' ? request.userResponses[question.id] : null,
    };
    return response;
  });
  db.update(media).set({ toDelete: false }).where(inArray(media.id, mediaIds));
  await db.insert(userResponses).values(responses!);
  return { success: true, error: undefined };
}
