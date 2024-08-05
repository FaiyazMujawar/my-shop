import { neon } from '@neondatabase/serverless';

import * as schema from '@config/db/schema';
import { drizzle } from 'drizzle-orm/neon-http';
import { DATABASE_URL } from '../env-vars';

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });
