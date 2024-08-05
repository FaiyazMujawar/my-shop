import { db } from '@config/db';
import { orders, responses } from '@config/db/schema';
import { getServiceById } from '@db/service';
import { upload } from '@lib/storage';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';

// TODO: format responses

export async function getAllOrders(user: User) {
  return await db.query.orders.findMany({
    with: {
      service: {
        columns: {
          title: true,
          description: true,
          price: true,
        },
      },
      responses: {
        with: { question: { columns: { text: true } } },
        columns: {
          orderId: false,
          questionId: false,
        },
      },
      user: {
        columns: { name: true },
      },
    },
    columns: {
      userId: false,
      serviceId: false,
    },
    where:
      user.role != 'ADMIN' ? eq(orders.userId, user.id as string) : undefined,
  });
}

export async function createOrder(form: FormData, user: User) {
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
    const response = {
      questionId: question.id!,
      type: question.type,
      orderId: '',
      answer: '',
      url: '',
    };
    if (question.type == 'file') {
      // TODO: handle file upload
      const objectKey = await upload(form.get(question.id!) as File);
      response.url = objectKey;
    } else {
      response.answer = form.get(question.id!) as string;
    }
    userResponses.push(response);
  }

  console.log(service.id, user.id);
  const order = await db
    .insert(orders)
    .values({
      serviceId: service.id!,
      userId: user.id!,
    })
    .returning({ id: orders.id });
  await db.insert(responses).values(
    userResponses.map((response) => {
      response.orderId = order[0].id;
      return response;
    })
  );
}
