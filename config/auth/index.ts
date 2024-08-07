import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import GoogleAuthProvider from 'next-auth/providers/google';
import env from '~/config/env';
import { db } from '~/db';
import { getUserById, updateUserRole } from '~/lib/db/user';

const GoogleAuth = GoogleAuthProvider({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
});

export const { handlers, signIn, auth } = NextAuth({
  callbacks: {
    jwt: async ({ token }) => {
      if (!token?.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      token.uid = user.id;
      token.role = user.role;

      if (env.ADMIN_EMAIL === user.email && user.role !== 'ADMIN') {
        updateUserRole(user.id, 'ADMIN');
        user.role = 'ADMIN';
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.role = token.role;
      session.user.id = token.uid;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  adapter: DrizzleAdapter(db),
  providers: [GoogleAuth],
});
