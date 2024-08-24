import { db } from '..';
import {
  accounts,
  media,
  orders,
  questions,
  services,
  userResponses,
  users,
} from '../schema';
import accountsJson from './data/accounts.json';
import ordersJson from './data/order.json';
import servicesJson from './data/services.json';
import usersJson from './data/users.json';

async function truncateDb() {
  console.log('Truncating database');

  await db.delete(userResponses).execute();
  await db.delete(media).execute();
  await db.delete(orders).execute();
  await db.delete(services).execute();
  await db.delete(accounts).execute();
  await db.delete(users).execute();

  console.log('Database truncated');
}

async function seed() {
  console.log('Starting seeding');

  console.log('Seeding users');
  await db.insert(users).values(usersJson).execute();

  console.log('Seeding accounts');
  await db
    .insert(accounts)
    .values(JSON.parse(JSON.stringify(accountsJson)))
    .execute();

  console.log('Seeding services');

  await db
    .insert(services)
    .values(JSON.parse(JSON.stringify(servicesJson)))
    .execute();

  console.log('Seeding questions');
  await db
    .insert(questions)
    .values(
      JSON.parse(JSON.stringify(servicesJson.flatMap((s) => s.questions)))
    )
    .execute();

  console.log('Seeding media');
  const userResponseMedia = ordersJson
    .flatMap((order) => order.userResponses)
    .map((response) => response.media)
    .filter((media) => !!media)
    .map((media) => ({
      ...media,
      createdAt: new Date(media.createdAt),
      updatedAt: new Date(media.updatedAt),
    }));
  const orderResultMedia = ordersJson
    .map((order) => order.result)
    .filter((media) => !!media)
    .map((media) => ({
      ...media,
      createdAt: new Date(media.createdAt),
      updatedAt: new Date(media.updatedAt),
    }));
  await db
    .insert(media)
    .values([...userResponseMedia, ...orderResultMedia])
    .execute();

  console.log('Seeding orders');
  await db
    .insert(orders)
    .values(
      ordersJson.map((order) => ({
        ...order,
        status: order.status as
          | 'pending'
          | 'accepted'
          | 'rejected'
          | 'completed',
        result: order.result?.id,
      }))
    )
    .execute();

  console.log('Seeding user responses');
  await db
    .insert(userResponses)
    .values(
      ordersJson.flatMap((order) =>
        order.userResponses.map((response) => ({
          ...response,
          media: response.media?.id,
        }))
      )
    )
    .execute();

  console.log('Seeding completed');
}

truncateDb()
  .then(async () => await seed())
  .catch((error) => console.error(error))
  .finally(() => {
    process.exit();
  });
