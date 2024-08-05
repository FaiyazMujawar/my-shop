import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@config/db';
import { ADMIN_EMAIL, Google } from '@config/env-vars';
import { getUserById, updateUserRole } from '@db/user';
import NextAuth from 'next-auth';
import GoogleAuthProvider from 'next-auth/providers/google';

const GoogleAuth = GoogleAuthProvider({
  clientId: Google.CLIENT_ID,
  clientSecret: Google.CLIENT_SECRET,
});

export const { handlers, signIn, auth } = NextAuth({
  callbacks: {
    jwt: async ({ token }) => {
      if (!token?.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      token.uid = user.id;
      token.role = user.role;

      if (ADMIN_EMAIL === user.email && user.role !== 'ADMIN') {
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
