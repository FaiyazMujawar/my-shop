import { S3Client } from '@aws-sdk/client-s3';
import { S3_CONFIG } from '@config/env-vars';

export class StorageClient {
  private static client: S3Client | undefined = undefined;

  private constructor() {}

  static instance() {
    if (!StorageClient.client) {
      StorageClient.client = new S3Client({
        region: S3_CONFIG.region,
        credentials: {
          accessKeyId: S3_CONFIG.credentials.accessKey,
          secretAccessKey: S3_CONFIG.credentials.secret,
        },
      });
    }
    return StorageClient.client;
  }
}
