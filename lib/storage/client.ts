import { S3Client } from '@aws-sdk/client-s3';
import env from '~/config/env';

export class StorageClient {
  private static client: S3Client | undefined = undefined;

  private constructor() {}

  static instance() {
    if (!StorageClient.client) {
      StorageClient.client = new S3Client({
        region: env.S3_REGION,
        endpoint: env.S3_ENDPOINT,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY,
          secretAccessKey: env.S3_SECRET_KEY,
        },
      });
    }
    return StorageClient.client;
  }
}
