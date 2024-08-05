import { DATABASE_URL } from '@config/env-vars';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./config/db/schema/index.ts'],
  out: './config/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
