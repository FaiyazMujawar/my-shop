import { PutObjectCommand } from '@aws-sdk/client-s3';
import { S3_CONFIG } from '@config/env-vars';
import { StorageClient } from './client';

export async function upload(file: File) {
  const client = StorageClient.instance();
  const fileKey = generateFileKey(file.name);
  const command = new PutObjectCommand({
    Bucket: S3_CONFIG.bucket,
    Key: fileKey,
    Body: file,
  });
  await client.send(command);
  return fileKey;
}

function generateFileKey(filename: string) {
  const timestamp = new Date().getUTCMilliseconds();
  const extension = filename.substring(filename.lastIndexOf('.') + 1);
  return filename + '-' + timestamp + '.' + extension;
}
