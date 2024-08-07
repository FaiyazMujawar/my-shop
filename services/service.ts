import { db } from '~/db';
import { questions, services } from '~/db/schema';
import { AddServiceSchema } from '~/utils/validations/schema';
import { eq } from 'drizzle-orm';
import { IService, AddService } from '~/types/service';

export async function getAllServices(): Promise<IService[]> {
  return await db.query.services.findMany({
    with: { questions: true },
  });
}

export async function getServiceById(
  id: string
): Promise<IService | undefined> {
  return await db.query.services.findFirst({
    where: eq(services.id, id),
    with: { questions: true },
  });
}

export async function addService(request: AddService) {
  var validation = AddServiceSchema.safeParse(request);
  if (!validation.success) {
    throw new Error(
      'Invalid request body: ' +
        validation.error.errors.map((error) => error.message).join(', ')
    );
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
