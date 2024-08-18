import { db } from '..';
import {
  accounts,
  media,
  orders,
  services,
  userResponses,
  users,
} from '../schema';
import { questions } from '../schema/question';
import accountsData from './data/accounts.json';
import ordersData from './data/order.json';
import servicesData from './data/services.json';
import usersData from './data/users.json';

async function truncate() {
  for (const table of [
    users,
    services,
    questions,
    orders,
    userResponses,
    media,
    accounts,
  ]) {
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

  console.log('Inserting data in orders');
  const dbOrders = ordersData.map((order) => {
    return {
      ...order,
      completedAt: order.completedAt ? new Date(order.completedAt) : undefined,
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
      status: order.status as 'pending' | 'completed',
    };
  });
  await db.insert(orders).values(dbOrders);

  console.log('Inserting data in media');
  const dbMedia = ordersData
    .flatMap((order) => order.userResponses)
    .map((response) => response.media)
    .filter((media) => !!media)
    .map((media) => {
      return {
        ...media,
        createdAt: new Date(media.createdAt),
        updatedAt: new Date(media.updatedAt),
      };
    });
  await db.insert(media).values(dbMedia);

  console.log('Inserting data in user responses');
  await db.insert(userResponses).values(
    ordersData.flatMap((order) => {
      return order.userResponses.map((response) => {
        return {
          ...response,
          media: response.media?.id,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        };
      });
    })
  );

  console.log('Database seeded');
  process.exit(0);
}

seed();
