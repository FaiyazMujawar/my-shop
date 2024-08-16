import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '..';

async function runMigrations() {
  console.log('Starting migrations...');
  try {
    await migrate(db, { migrationsFolder: 'src/db/migrations' });
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Migrations complete');
  }
}

runMigrations();
