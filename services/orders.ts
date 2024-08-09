import { eq } from 'drizzle-orm';
import { User } from 'next-auth';
import { db } from '~/db';
import { answers, orders } from '~/db/schema';
import { upload } from '~/lib/storage';
import { IAnswer, IOrder } from '~/types/order';
import { getServiceById } from './service';

export const getAllOrders = async (user: User): Promise<IOrder[]> => {
  return await db.query.orders.findMany({
    with: {
      service: true,
      answers: { with: { question: true } },
      user: true,
    },
    where: user?.role == 'ADMIN' ? undefined : eq(orders.userId, user.id!),
  });
};

export const getOrderById = async (id: string): Promise<IOrder | undefined> => {
  return await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      service: true,
      answers: { with: { question: true } },
      user: true,
    },
  });
};

export const createOrder = async (form: FormData, user: User) => {
  const serviceId = form.get('serviceId');
  const service = await getServiceById(serviceId as string);
  if (!service) {
    throw new Error(`Service ${serviceId} not found`);
  }

  const userResponses: any[] = [];
  for (const question of service.questions) {
    if (!form.get(question.id!)) {
      throw new Error(`Question ${question.id} is required`);
    }
    const answer: Partial<IAnswer> = {
      questionId: question.id!,
      type: question.type,
      orderId: undefined,
      answer: undefined,
      filename: undefined,
      objectKey: undefined,
    };
    if (question.type == 'file') {
      const file = (form.get(question.id!) as unknown) as File;
      const objectKey = await upload(file);
      answer.objectKey = objectKey;
      answer.filename = file.name;
    } else {
      answer.answer = (form.get(question.id!) as unknown) as string;
    }
    userResponses.push(answer);
  }

  const orderId = await db
    .insert(orders)
    .values({
      serviceId: service.id!,
      userId: user.id!,
    })
    .returning({ id: orders.id });
  await db.insert(answers).values(
    userResponses.map((response) => {
      response.orderId = orderId[0].id;
      return response;
    })
  );
};
