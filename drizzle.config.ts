import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './config/env-vars';

export default defineConfig({
  schema: ['./config/db/schema/auth.ts'],
  out: './config/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
