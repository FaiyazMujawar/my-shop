'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '~/db';
import { orders } from '~/db/schema';

export async function rejectOrder(orderId: string, note: string) {
  try {
    await db
      .update(orders)
      .set({ status: 'rejected', note })
      .where(eq(orders.id, orderId));
    revalidatePath('/orders');
    return { succes: true };
  } catch (error) {
    return { succes: false };
  }
}
