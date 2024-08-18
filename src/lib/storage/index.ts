import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import env from '~/env';
import client from './client';

export async function getPresignedUploadUrl(
  type: string,
  isPublic: boolean = false
) {
  const prefix = isPublic ? 'p/' : '';
  const extension = type.split('/')[1];
  const key = `${prefix}/${randomUUID()}.${extension}`;
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    ContentType: type,
  });
  const url = await getSignedUrl(client, command, { expiresIn: 60 });
  return { key, url };
}
