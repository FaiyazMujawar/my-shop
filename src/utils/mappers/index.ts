import { IOrder, OrderResponse } from '~/app-types/order';

export function toOrderResponse(order: Partial<IOrder>): OrderResponse {
  return {
    id: order.id!,
    status: order.status!,
    service: order.service
      ? {
          id: order.service?.id,
          title: order.service?.title,
          price: order.service?.price,
        }
      : null,
    userResponses: order.userResponses
      ? order.userResponses.map((response) => ({
          id: response.id,
          question: response.question?.question,
          answer: response.answer,
          media: response.media?.id ?? null,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        }))
      : [],
    user: {
      name: order.user?.name ?? '',
      email: order.user?.email ?? '',
    },
    note: order.note ?? null,
    result: order.result?.id ?? null,
    createdAt: order.createdAt!,
    updatedAt: order.updatedAt!,
  };
}

function o() {}
