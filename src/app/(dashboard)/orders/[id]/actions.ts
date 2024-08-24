'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '~/db';
import { media, orders } from '~/db/schema';

export async function acceptOrder(orderId: string) {
  await db
    .update(orders)
    .set({ status: 'accepted' })
    .where(eq(orders.id, orderId));
  revalidatePath('/orders');
}

export async function cancelOrder(orderId: string) {
  await db
    .update(orders)
    .set({ status: 'cancelled' })
    .where(eq(orders.id, orderId));
  revalidatePath('/orders');
}

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

export async function markDone(orderId: string, mediaId: string, note: string) {
  try {
    await db
      .update(orders)
      .set({ status: 'completed', result: mediaId, note })
      .where(eq(orders.id, orderId));
    db.update(media).set({ toDelete: false }).where(eq(media.id, mediaId));
    revalidatePath('/orders');
    return { success: true };
  } catch (error) {
    return { succes: false };
  }
}
