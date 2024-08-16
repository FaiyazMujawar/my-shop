import { config } from 'dotenv';
import { z, ZodError } from 'zod';

config({ path: ['.env'] });

const envSchema = z.object({
  APP_NAME: z.string(),
  AUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.string(),
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
