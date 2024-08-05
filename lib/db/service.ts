import { db } from '@config/db';
import { questions, services } from '@config/db/schema';
import { Service } from '@custom-types/service';
import { CreateServiceSchema } from '@utils/validations/schema';

export async function getAllServices() {
  return await db.query.services.findMany({
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
