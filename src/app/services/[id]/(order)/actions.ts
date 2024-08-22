'use server';

import { eq } from 'drizzle-orm';
import { OrderRequest } from '~/app-types/order';
import { auth } from '~/config/auth';
import { db } from '~/db';
import { orders, services, userResponses } from '~/db/schema';

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
  const responses = service?.questions.map((question) => {
    const response = {
      orderId: order[0].id,
      answer:
        question.type !== 'file'
          ? request.userResponses[question.id].toString()
          : null,
      media:
        question.type === 'file' ? request.userResponses[question.id] : null,
    };
    return response;
  });
  await db.insert(userResponses).values(responses!);
  return { success: true, error: undefined };
}
