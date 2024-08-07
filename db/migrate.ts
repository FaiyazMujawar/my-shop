import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from './index';

async function runMigrations() {
  try {
    console.log('DB migration started....');
    await migrate(db, { migrationsFolder: 'db/migrations' });
  } catch (error) {
    console.error('DB Migration failed: ', error);
  } finally {
    console.log('DB migration completed...');
  }
}

runMigrations();
