import { config } from 'dotenv';
import { z, ZodError } from 'zod';

config({ path: ['.env'] });

const stringArray = z.coerce.string().transform((str) => str.split(/,\s*/));

const stringBoolean = z.coerce
  .string()
  .transform((str) => str === 'true')
  .default('false');

const envSchema = z.object({
  APP_NAME: z.string(),
  AUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  SHOW_SQL: stringBoolean,
  ADMIN_EMAILS: stringArray,
  S3_BUCKET: z.string(),
  S3_REGION: z.string(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_ENDPOINT: z.string(),
});

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n';
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n';
    });
    const e = new Error(message);
    e.stack = '';
    throw e;
  } else {
    console.error(error);
  }
}

export default envSchema.parse(process.env);
