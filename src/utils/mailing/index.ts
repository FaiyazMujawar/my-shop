import { eq } from 'drizzle-orm';
import { IOrder } from '~/app-types/order';
import { db } from '~/db';
import { users } from '~/db/schema';
import env from '~/env';
import { sendMail } from '~/lib/mail/client';
import { formatString } from '~/lib/utils';
import { HTML, ORDER_PLACED_ADMIN, ORDER_PLACED_USER } from './messages';

export async function adminOrderPlacedMail({
  service,
  user,
}: Pick<IOrder, 'user' | 'service'>) {
  try {
    const admins = (await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.role, 'admin'))) as { email: string }[];
    const adminEmails = admins.map(({ email }) => email);

    const message = formatString(
      ORDER_PLACED_ADMIN,
      service.title,
      user.name,
      user.email,
      env.APP_NAME
    );
    const body = formatString(HTML, message);

    await sendMail(adminEmails, 'Status - New Order Received', body);
  } catch (error) {
    console.error(error);
  }
}

export async function userOrderPlacedMail({
  service,
  user,
}: Pick<IOrder, 'user' | 'service'>) {
  try {
    const message = formatString(
      ORDER_PLACED_USER,
      service.title,
      user.name,
      env.APP_NAME
    );
    const body = formatString(HTML, message);
    await sendMail([user.email!], 'Status - Order Placed', body);
  } catch (error) {
    console.error(error);
  }
}
