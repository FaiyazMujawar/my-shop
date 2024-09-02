import { eq } from 'drizzle-orm';
import { IOrder } from '~/app-types/order';
import { db } from '~/db';
import { orders } from '~/db/schema';
import { toOrderResponse } from '~/utils/mappers';

type OrderRelations = {
  user?: true | undefined;
  service?: true | undefined;
  userResponses?: true | undefined;
  result?: true;
};

const defaultRelations: OrderRelations = {
  service: undefined,
  user: undefined,
  userResponses: undefined,
  result: true,
};

export async function findOrderById(
  id: string,
  relations: OrderRelations = defaultRelations
) {
  const orderInDb = await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      user: relations.user,
      service: relations.service,
      userResponses: !relations.userResponses
        ? undefined
        : {
            with: { media: true, question: true },
          },
      result: relations.result,
    },
  });
  if (!orderInDb) {
    return null;
  }
  return toOrderResponse(orderInDb as Partial<IOrder>);
}
