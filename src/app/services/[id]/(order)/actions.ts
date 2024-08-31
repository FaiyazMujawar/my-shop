'use server';

import { eq, inArray } from 'drizzle-orm';
import { IOrder, OrderRequest } from '~/app-types/order';
import { auth } from '~/config/auth';
import { db } from '~/db';
import { media, orders, services, userResponses } from '~/db/schema';
import { adminOrderPlacedMail, userOrderPlacedMail } from '~/utils/mailing';

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
      questionId: question.id,
      [question.type === 'file' ? 'media' : 'answer']: request.userResponses[
        question.id
      ]?.toString(),
    };
    return response;
  });
  await db.insert(userResponses).values(responses!);
  cleanup(order[0].id);
  return { success: true, error: undefined };
}

async function cleanup(orderId: string) {
  console.log('Cleaning up');
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      service: true,
      user: true,
      userResponses: { with: { media: true, question: true } },
    },
  });
  if (order === undefined) return;
  await markMediaToNotDelete(order);
  await sendMails(order);
  console.log('Cleaning up done');
}

async function markMediaToNotDelete(order: Pick<IOrder, 'userResponses'>) {
  const mediaIds = order.userResponses
    .map((response) => response.media?.id)
    .filter((media) => media !== undefined);
  await db
    .update(media)
    .set({ toDelete: false })
    .where(inArray(media.id, mediaIds));
}

async function sendMails(order: Pick<IOrder, 'user' | 'service'>) {
  await adminOrderPlacedMail(order);
  await userOrderPlacedMail(order);
}
