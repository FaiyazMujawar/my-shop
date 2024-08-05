import { db } from '@config/db';
import { questions, services } from '@config/db/schema';
import { Service } from '@custom-types/service';
import { CreateServiceSchema } from '@utils/validations/schema';
import { eq } from 'drizzle-orm';

export async function getAllServices() {
  return await db.query.services.findMany({
    with: { questions: true },
  });
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  return await db.query.services.findFirst({
    where: eq(services.id, id),
    with: { questions: true },
  });
}

export async function createService(request: Service) {
  var validation = CreateServiceSchema.safeParse(request);
  if (!validation.success) {
    throw new Error('Invalid request body');
  }
  const serviceId = await db
    .insert(services)
    .values({ ...request })
    .returning({
      id: services.id,
    });
  await db.insert(questions).values(
    request.questions.map((question) => {
      return {
        ...question,
        serviceId: serviceId[0].id,
      };
    })
  );
}
