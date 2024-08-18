'use server';
import { db } from '~/db';
import { media } from '~/db/schema';
import { getPresignedUploadUrl } from '~/lib/storage';

export const getUploadUrl = async (type: string, isPublic: boolean = false) => {
  const upload = await getPresignedUploadUrl(type, isPublic);
  const mediaInDb = await db
    .insert(media)
    .values({
      contentType: type,
      objectKey: upload.key,
      toDelete: true,
    })
    .returning({ id: media.id });
  return { url: upload.url, mediaId: mediaInDb[0].id };
};
