import env from '~/config/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./db/schema/**/*.{ts,js}'],
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
