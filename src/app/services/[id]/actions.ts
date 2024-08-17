'use server';

import { deleteService as deleteServiceById } from '~/db/dao/services';

export async function deleteService(id: string) {
  await deleteServiceById(id);
}
