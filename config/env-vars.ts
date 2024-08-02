import { config } from 'dotenv';

config({ path: ['.env', '.env.local'] });

export const Google = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

export const DATABASE_URL = process.env.DATABASE_URL!;
