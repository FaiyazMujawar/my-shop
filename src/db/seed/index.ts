import { db } from '..';
import { services, users } from '../schema';
import servicesData from './data/services.json';
import usersData from './data/users.json';

async function truncate() {
  for (const table of [users, services]) {
    await db.delete(table);
  }
}

async function seed() {
  console.log('Seeding database');

  await truncate();

  console.log('Inserting data in users');
  await db.insert(users).values(usersData);

  console.log('Inserting data in services');
  await db.insert(services).values(
    servicesData.map((service) => {
      return {
        ...service,
        type: service.type as 'online' | 'offline',
      };
    })
  );

  console.log('Database seeded');
  process.exit(0);
}

seed();
