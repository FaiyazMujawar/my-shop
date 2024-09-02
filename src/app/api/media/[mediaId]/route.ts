import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '~/db';
import { media } from '~/db/schema';
import { getPresignedGetUrl } from '~/lib/storage';

export async function GET(
  _: Request,
  { params }: { params: { mediaId: string } }
) {
  const mediaInDb = await db.query.media.findFirst({
    where: eq(media.id, params.mediaId),
  });
  if (!mediaInDb) {
    throw new Error('Media not found');
  }
  const getUrl = await getPresignedGetUrl(mediaInDb.objectKey);
  return NextResponse.redirect(getUrl);
}
