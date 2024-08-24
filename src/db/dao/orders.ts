import { desc, eq } from 'drizzle-orm';
import { User } from 'next-auth';
import { IOrder } from '~/app-types/order';
import { db } from '..';
import { orders } from '../schema';

export async function getOrderById(id: string): Promise<IOrder | undefined> {
  return await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      service: true,
      user: true,
      userResponses: { with: { media: true, question: true } },
    },
  });
}

export async function getAllOrders(user: User): Promise<IOrder[]> {
  return await db.query.orders.findMany({
    where: user.role == 'admin' ? undefined : eq(orders.userId, user.id!),
    with: { service: true, userResponses: true, user: true },
    orderBy: desc(orders.createdAt),
  });
}
