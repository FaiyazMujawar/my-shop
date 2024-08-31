'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { Attachment } from 'nodemailer/lib/mailer';
import { db } from '~/db';
import { media, orders, users } from '~/db/schema';
import env from '~/env';
import { sendMail } from '~/lib/mail/client';
import { getFile } from '~/lib/storage';
import { formatString } from '~/lib/utils';
import {
  HTML,
  ORDER_ACCEPTED,
  ORDER_CANCELLED,
  ORDER_REJECTED,
} from '~/utils/mailing/messages';

export async function acceptOrder(orderId: string) {
  await db
    .update(orders)
    .set({ status: 'accepted' })
    .where(eq(orders.id, orderId));
  orderAcceptedMail(orderId);
  revalidatePath('/orders');
}

export async function cancelOrder(orderId: string) {
  await db
    .update(orders)
    .set({ status: 'cancelled' })
    .where(eq(orders.id, orderId));
  orderCancelledMail(orderId);
  revalidatePath('/orders');
}

export async function rejectOrder(orderId: string, note: string) {
  try {
    await db
      .update(orders)
      .set({ status: 'rejected', note })
      .where(eq(orders.id, orderId));
    revalidatePath('/orders');
    orderRejectedMail(orderId);
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
    orderProcessedMail(orderId);
    return { success: true };
  } catch (error) {
    return { succes: false };
  }
}

async function orderAcceptedMail(orderId: string) {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: { user: true, service: true },
  });
  if (!order) {
    throw new Error('Order not found');
  }

  const message = formatString(
    ORDER_ACCEPTED,
    order.user.name,
    order.id,
    order.service.title,
    env.APP_NAME
  );
  await sendMail(
    [order.user?.email!],
    'Status - Order Accepted',
    formatString(HTML, message)
  );
}

async function orderCancelledMail(orderId: string) {
  const admins = (await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.role, 'admin'))) as { email: string }[];
  const adminEmails = admins.map(({ email }) => email);
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: { user: true, service: true },
  });
  if (!order) {
    throw new Error('Order not found');
  }

  const message = formatString(
    ORDER_CANCELLED,
    order.user.name,
    order.id,
    order.service.title,
    env.APP_NAME
  );
  await sendMail(
    adminEmails,
    'Status - Order Cancelled',
    formatString(HTML, message)
  );
}

async function orderRejectedMail(orderId: string) {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: { user: true, service: true },
  });
  if (!order) {
    throw new Error('Order not found');
  }
  const message = formatString(
    ORDER_REJECTED,
    order.user?.name,
    order.id,
    order.service?.title,
    order.note,
    env.APP_NAME
  );
  await sendMail(
    [order.user?.email!],
    'Status - Order Rejected',
    formatString(HTML, message)
  );
}

async function orderProcessedMail(orderId: string) {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: { user: true, service: true, result: true },
  });
  if (!order) {
    throw new Error('Order not found');
  }
  const message = formatString(
    ORDER_REJECTED,
    order.user?.name,
    order.id,
    order.service?.title,
    order.note,
    env.APP_NAME
  );
  const attachments: Attachment[] = [];
  if (order.result) {
    const response = await getFile(order.result.objectKey);
    attachments.push({
      filename: 'result-file' + order.result.contentType.split('/')[1],
      contentType: order.result.contentType,
      content: Buffer.from(response!.buffer),
    });
  }
  await sendMail(
    [order.user?.email!],
    'Status - Order Processed',
    formatString(HTML, message),
    attachments
  );
}
