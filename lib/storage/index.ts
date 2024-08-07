import { PutObjectCommand } from '@aws-sdk/client-s3';
import env from '~/config/env';
import { StorageClient } from './client';

export async function upload(file: File) {
  // TODO: make this better
  const client = StorageClient.instance();
  const fileKey = generateFileKey(file.name);
  const buffer = (await file.arrayBuffer()) as Buffer;
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: fileKey,
    Body: buffer,
  });
  await client.send(command);
  return fileKey;
}

function generateFileKey(filename: string) {
  const timestamp = new Date().getUTCMilliseconds();
  const extension = filename.substring(filename.lastIndexOf('.') + 1);
  return filename + '-' + timestamp + '.' + extension;
}
