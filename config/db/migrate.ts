import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from './index';

async function runMigrations() {
  try {
    console.log('migrating db');
    await migrate(db, { migrationsFolder: 'config/db/migrations' });
  } catch (error) {
    console.error(error);
  } finally {
    console.log('db migrated');
  }
}

runMigrations();
