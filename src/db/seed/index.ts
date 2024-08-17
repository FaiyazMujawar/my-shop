import { db } from '..';
import { accounts, services, users } from '../schema';
import { questions } from '../schema/question';
import accountsData from './data/accounts.json';
import servicesData from './data/services.json';
import usersData from './data/users.json';

async function truncate() {
  for (const table of [users, services, questions]) {
    await db.delete(table);
  }
}

async function seed() {
  console.log('Seeding database');

  await truncate();

  console.log('Inserting data in users');
  await db.insert(users).values(usersData);

  console.log('Inserting data in accounts');
  await db.insert(accounts).values(
    accountsData.map((account) => {
      return {
        ...account,
        type: account.type as 'oauth' | 'oidc',
      };
    })
  );

  console.log('Inserting data in services');
  await db.insert(services).values(
    servicesData.map((service) => {
      return {
        ...service,
        type: service.type as 'online' | 'offline',
      };
    })
  );

  const questionsData = servicesData.flatMap((service) => {
    return service.questions.map((question) => {
      return {
        ...question,
        type: question.type as 'file' | 'text' | 'date' | 'number',
      };
    });
  });

  console.log('Inserting data in questions');
  await db.insert(questions).values(questionsData);

  console.log('Database seeded');
  process.exit(0);
}

seed();
