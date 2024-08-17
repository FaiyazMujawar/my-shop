import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import { db } from '~/db';
import { users } from '~/db/schema';
import GoogleProvider from './google-provider';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  callbacks: {
    jwt: async ({ token }) => {
      if (!token?.sub) return token;
      const user = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });
      if (!user) return token;
      token.role = user.role;
      return token;
    },
    session: async ({ session, token }) => {
      session.user.role = token.role;
      session.user.id = token.uid;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  providers: [GoogleProvider],
});
